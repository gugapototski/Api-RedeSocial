-- CreateTable
CREATE TABLE "users" (
    "id_user" SERIAL NOT NULL,
    "nome_apelido_user" TEXT,
    "email_user" TEXT NOT NULL,
    "senha_user" TEXT NOT NULL,
    "confirmar_senha_user" TEXT NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id_user")
);

-- CreateTable
CREATE TABLE "postagem" (
    "id_postagem" SERIAL NOT NULL,
    "id_user_postagem" INTEGER NOT NULL,
    "postagem_texto" TEXT NOT NULL,
    "like_qtd" INTEGER NOT NULL,

    CONSTRAINT "postagem_pkey" PRIMARY KEY ("id_postagem")
);

-- CreateTable
CREATE TABLE "comentario" (
    "id_comentario" SERIAL NOT NULL,
    "id_postagem" INTEGER NOT NULL,
    "id_user_comentario" INTEGER NOT NULL,
    "comentario_texto" TEXT NOT NULL,

    CONSTRAINT "comentario_pkey" PRIMARY KEY ("id_comentario")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_user_key" ON "users"("email_user");

-- AddForeignKey
ALTER TABLE "postagem" ADD CONSTRAINT "postagem_id_user_postagem_fkey" FOREIGN KEY ("id_user_postagem") REFERENCES "users"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comentario" ADD CONSTRAINT "comentario_id_postagem_fkey" FOREIGN KEY ("id_postagem") REFERENCES "postagem"("id_postagem") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comentario" ADD CONSTRAINT "comentario_id_user_comentario_fkey" FOREIGN KEY ("id_user_comentario") REFERENCES "users"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;
