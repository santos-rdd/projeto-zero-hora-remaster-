import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./newUser.css";
import { useState } from "react";
import rArrow from "../../assets/images/icons/rArrow.png";
import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../(backEnd)/firebaseAdm";
import toast from "react-hot-toast";
import emailjs from "@emailjs/browser";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import validator from "validator";
import bcrypt from "bcryptjs";

export default function NewUser(props) {
  const [register, setRegister] = useState(false);
  const [forgot, setForgot] = useState(false);

  const email = props.email;
  const senha = props.senha;
  const mostrarSenha = props.mostrarSenha;
  const esperaLogin = props.esperaLogin;
  const erro = props.erro;

  const setEmail = props.setEmail;
  const setSenha = props.setSenha;
  const setMostrarSenha = props.setMostrarSenha;

  async function registrarNovoUsuario() {
    if (!email || !senha) {
      toast.error("Preencha todos os campos!");
      return;
    }

    if (senha.length < 6) {
      toast.error("A senha deve ter um mínimo de 6 dígitos!");
      return;
    }

    if (!validator.isEmail(email)) {
      toast.error("E-mail inválido!");
      return;
    }

    try {
      const salt = await bcrypt.genSalt(10);
      const senhaHash = await bcrypt.hash(senha, salt);

      const pendentes = await getDocs(collection(db, "pendingUsers"));
      const existePendente = pendentes.docs.find((d) => d.data().email === email);

      if (existePendente) {
        toast.error("Este e-mail já está aguardando aprovação.");
        return;
      }

      const token = Math.random().toString(36).substring(2, 12);
      await addDoc(collection(db, "pendingUsers"), {
        email,
        senha: senhaHash,
        token,
        aprovado: false,
      });

      const baseUrl = import.meta.env.VITE_APP_URL || window.location.origin;
      const link = `${baseUrl}/approve?email=${email}&token=${token}`;
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
      const toEmail = import.meta.env.VITE_EMAILJS_TO_EMAIL || "rodriguespt59@gmail.com, samidzerohora@gmail.com";

      await emailjs.send(
        serviceId,
        templateId,
        {
          to_email: toEmail,
          link,
          email_usuario: email,
        },
        publicKey
      );

      toast.success("Seu pedido foi enviado para aprovação!");
      setRegister(false);
    } catch (err) {
      toast.error("Erro ao registrar: " + err.message);
    }
  }

  async function recuperarSenha() {
    if (!email) {
      toast.error("Digite seu email!");
      return;
    }

    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      toast.success("Email de redefinição enviado!");
      setForgot(false);
    } catch (err) {
      toast.error("Erro: " + err.message);
    }
  }

  return (
    <>
      {register ? (
        <div className="loginArea">
          <img
            src={rArrow}
            alt="Voltar"
            className="back"
            onClick={() => setRegister(false)}
          />

          <h2 className="title">Crie seu usuário!</h2>

          <input
            type="text"
            placeholder="E-mail"
            className={`loginInput ${erro ? "treme" : ""}`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type={mostrarSenha ? "text" : "password"}
            placeholder="Senha"
            className={`loginInput ${erro ? "treme" : ""}`}
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />

          <span
            className="mostrarSenha align"
            onClick={() => setMostrarSenha(!mostrarSenha)}
          >
            {mostrarSenha ? <FaEyeSlash /> : <FaEye />}
          </span>

          <button className="btnLog sp" onClick={registrarNovoUsuario}>
            Enviar pedido
          </button>
        </div>
      ) : forgot ? (
        <div className="loginArea">
          <img
            src={rArrow}
            alt="Voltar"
            className="back"
            onClick={() => {
              setRegister(false);
              setForgot(false);
            }}
          />

          <h2 className="title">Digite seu email para recuperar a senha</h2>

          <input
            type="text"
            placeholder="E-mail cadastrado"
            className={`loginInput ${erro ? "treme" : ""}`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <button className="btnLog sp" onClick={recuperarSenha}>
            Enviar
          </button>
        </div>
      ) : (
        <div className="loginArea">
          <h2 className="title">Olá, Por favor entre com sua conta!</h2>

          <input
            type="text"
            placeholder="Usuário"
            className={`loginInput ${erro ? "treme" : ""}`}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type={mostrarSenha ? "text" : "password"}
            placeholder="Senha"
            className={`loginInput ${erro ? "treme" : ""}`}
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />

          <span
            className="mostrarSenha2"
            onClick={() => setMostrarSenha(!mostrarSenha)}
          >
            {mostrarSenha ? <FaEyeSlash /> : <FaEye />}
          </span>

          <button className="forgotPassword" onClick={() => setForgot(true)}>
            Esqueceu a Senha?
          </button>

          <button className="btnLog" onClick={esperaLogin}>
            Entrar
          </button>

          <button className="btnSingUp" onClick={() => setRegister(true)}>
            Registrar
          </button>
        </div>
      )}
    </>
  );
}
