import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import validator from "validator";
import { db } from "../firebaseAdm";
import { collection, doc, setDoc, getDocs, query, where, updateDoc, arrayUnion } from "firebase/firestore";

export function useLogicaPedidos() {
  const [listaPedidos, setListaPedidos] = useState([]);
  const [numeroPedido, setNumeroPedido] = useState("");
  const [valorFinal, setValorFinal] = useState(0);
  const [itensFinal, setItensFinal] = useState([]);

  const [tremeNome, setTremeNome] = useState("");
  const [tremeCpf, setTremeCpf] = useState("");
  const [pag1, setPage1] = useState(true);
  const [state, setState] = useState(false);

  const [nomeFuncionario, setNomeFuncionario] = useState("");
  const [cpfFuncionario, setCpfFuncionario] = useState("");

  const [nomeCliente, setNomeCliente] = useState("");
  const [emailCliente, setEmailCliente] = useState("");
  const [telefoneCliente, setTelefoneCliente] = useState("");

  useEffect(() => window.scrollTo(0, 0), [pag1, state]);

  async function carregarPedidos() {
    const snapshot = await getDocs(collection(db, "pedidosCriados"));
    const pedidos = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    setListaPedidos(pedidos);
  }

  useEffect(() => {
    carregarPedidos();
  }, []);

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

  async function confirmarPedido(totalPedido, itens = []) {
    if (!nomeCliente || !emailCliente || !telefoneCliente) {
      toast.error("Preencha todos os campos!");
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
      const itensValidos = itens.filter(item => item.quantidade > 0);

      const pedidosSnapshot = await getDocs(collection(db, "pedidosCriados"));
      let nextNumber = (pedidosSnapshot.size + 1).toString().padStart(5, "0");

      const criadoEmISO = new Date().toISOString();

      const pedidoData = {
        numeroPedido: nextNumber,
        valorTotal: totalPedido,
        funcionario: { nome: nomeFuncionario, cpf: cpfFuncionario },
        cliente: { nome: nomeCliente, email: emailCliente, telefone: telefoneCliente },
        itens: itensValidos,
        status: "pendente",
        criadoEm: criadoEmISO
      };

      await setDoc(doc(db, "pedidosCriados", nextNumber), pedidoData);

      const clienteRef = doc(db, "pedidosUsuarios", emailCliente);
      const q = query(collection(db, "pedidosUsuarios"), where("email", "==", emailCliente));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        await setDoc(clienteRef, {
          nome: nomeCliente,
          email: emailCliente,
          telefone: telefoneCliente,
          pedidos: [pedidoData]
        });
      } else {
        await updateDoc(clienteRef, {
          pedidos: arrayUnion(pedidoData)
        });
      }

      setNumeroPedido(nextNumber);
      setValorFinal(totalPedido);
      setItensFinal(itensValidos);
      localStorage.setItem("pedidoAtual", JSON.stringify(pedidoData));

      toast.success("Pedido registrado com sucesso!");
      setState(true);
      await carregarPedidos();

    } catch (err) {
      console.error(err);
      toast.error("Erro ao salvar pedido.");
    }
  }

  return {
    tremeNome,
    tremeCpf,
    pag1,
    state,
    setPage1,
    setState,
    nomeFuncionario,
    cpfFuncionario,
    setNomeFuncionario,
    setCpfFuncionario,
    nomeCliente,
    emailCliente,
    telefoneCliente,
    setNomeCliente,
    setEmailCliente,
    setTelefoneCliente,
    iniciarPedido,
    confirmarPedido,
    numeroPedido,
    valorFinal,
    setValorFinal,
    itensFinal,
    setItensFinal,
    listaPedidos
  };
}
