import { Role } from '@prisma/client';
import prismaClient from '../../prisma'
import { hash } from 'bcryptjs'
import nodemailer from "nodemailer";


interface UserRequest {
  photo: string;
  name: string;
  email: string;
  password: string;
}

class AdminCreateUserService {
  async execute({ photo, name, email, password }: UserRequest) {

    // verificar se ele enviou um email
    if (!email) {
      throw new Error("Email incorrect")
    }

    //Verificar se esse email já está cadastrado na plataforma
    const userAlreadyExists = await prismaClient.user.findFirst({
      where: {
        email: email,
      }
    })

    if (userAlreadyExists) {
      throw new Error("User already exists")
    }

    const passwordHash = await hash(password, 8);

    const user = await prismaClient.user.create({
      data: {
        photo: photo,
        name: name,
        email: email,
        password: passwordHash,
        role: Role.ADMIN,
      },
      select: {
        id: true,
        photo: true,
        name: true,
        email: true,
        role: true,
        authenticated: true
      }
    })

    const transporter = nodemailer.createTransport({
      host: "smart.iagentesmtp.com.br",
      port: 587,
      auth: {
        user: "contato@builderseunegocioonline.com",
        pass: "45839a96"
      }
    })

    await transporter.sendMail({
      from: "contato@builderseunegocioonline.com.br",
      to: "gabriel.bastiani@hotmail.com.br",
      subject: "Confirme seu cadastro de usuario no Blog",
      html: `<div style="background-color: rgb(223, 145, 0); color: black; padding: 0 55px;">
                <h2>Confirme seu cadastro!</h2>
            </div>
            
            <article>
                <p>Olá, ${user.name}!</p>
                <p><a href="https://blog.builderseunegocioonline.com.br/userAuthenticated?user_id=${user.id}">CLIQUE AQUI</a>, para confirmar sua conta junto ao Blog e poder acessa-lo com os dados que cadastrou anteriormente.</p>
            </article>
            
            <div style="background-color: rgb(223, 145, 0); color: black; padding: 0 55px;">
                <h5>Blog Builder Seu Negocio Online</h5>
            </div>`,
    });

    return user;
  }
}

export { AdminCreateUserService }