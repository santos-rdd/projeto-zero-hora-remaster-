import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import validator from "validator";
import { db } from "../firebaseAdm";
import { collection, doc, setDoc, getDocs, query, where } from "firebase/firestore";

export function useLogicaPedidos() {
  /* Efeitos */
  const [tremeNome, setTremeNome] = useState("");
  const [tremeCpf, setTremeCpf] = useState("");

  /* Telas */
  const [pag1, setPage1] = useState(true);
  const [state, setState] = useState(false);

  /* Funcionário */
  const [nomeFuncionario, setNomeFuncionario] = useState("");
  const [cpfFuncionario, setCpfFuncionario] = useState("");

  /* Cliente */
  const [nomeCliente, setNomeCliente] = useState("");
  const [emailCliente, setEmailCliente] = useState("");
  const [telefoneCliente, setTelefoneCliente] = useState("");

  /* Scroll automático */
  useEffect(() => window.scrollTo(0, 0), [pag1, state]);

  /* ---- Iniciar Pedido ---- */
  function iniciarPedido() {
    if (!nomeFuncionario || !cpfFuncionario) {
      toast.error("Preencha os campos para iniciar!");
      setTremeNome("treme");
      setTremeCpf("treme");
      setTimeout(() => setTremeNome(""), 350);
      setTimeout(() => setTremeCpf(""), 350);
      return;
    }

    if (nomeFuncionario.length < 3) {
      toast.error("O nome deve ter ao menos 3 caracteres!");
      setTremeNome("treme");
      setTimeout(() => setTremeNome(""), 350);
      return;
    }

    if (!/^\d+$/.test(cpfFuncionario) || cpfFuncionario.length !== 11) {
      toast.error("CPF inválido!");
      setTremeCpf("treme");
      setTimeout(() => setTremeCpf(""), 350);
      return;
    }

    toast.success("Pedido iniciado!");
    setPage1(false);
  }

  /* ---- Confirmar Pedido ---- */
  async function confirmarPedido(totalPedido, itens = []) {
    if (!nomeCliente || !emailCliente || !telefoneCliente) {
      toast.error("Preencha os dados do cliente!");
      return;
    }

    if (!validator.isEmail(emailCliente)) {
      toast.error("E-mail inválido!");
      return;
    }

    if (!validator.isMobilePhone(telefoneCliente, "pt-BR")) {
      toast.error("Telefone inválido!");
      return;
    }

    try {
      // Verifica se cliente já existe
      const q = query(collection(db, "pedidosUsuarios"), where("email", "==", emailCliente));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        await setDoc(doc(db, "pedidosUsuarios", emailCliente), {
          nome: nomeCliente,
          email: emailCliente,
          telefone: telefoneCliente,
          cpf: "",
          pedidos: []
        });
      }

      // Pega numeração
      const pedidosSnapshot = await getDocs(collection(db, "pedidosCriados"));
      let nextNumber = (pedidosSnapshot.size + 1).toString().padStart(5, "0");
      if (Number(nextNumber) > 99999) nextNumber = "00001";

      await setDoc(doc(db, "pedidosCriados", nextNumber), {
        numeroPedido: nextNumber,
        valorTotal: totalPedido,
        funcionarioNome: nomeFuncionario,
        funcionarioCpf: cpfFuncionario,
        cliente: {
          nome: nomeCliente,
          email: emailCliente,
          telefone: telefoneCliente
        },
        itens,
        status: "pendente",
        criadoEm: new Date(),
        aprovadoEm: new Date()
      });

      toast.success("Pedido confirmado!");
      setState(true);

    } catch (err) {
      console.error(err);
      toast.error("Erro ao salvar pedido.");
    }
  }

  return {
    // Tremer input
    tremeNome,
    tremeCpf,

    // Páginas
    pag1,
    state,
    setPage1,
    setState,

    // Funcionário
    nomeFuncionario,
    cpfFuncionario,
    setNomeFuncionario,
    setCpfFuncionario,

    // Cliente
    nomeCliente,
    emailCliente,
    telefoneCliente,
    setNomeCliente,
    setEmailCliente,
    setTelefoneCliente,

    iniciarPedido,
    confirmarPedido
  };
}
