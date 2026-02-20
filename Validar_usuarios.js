// Arquivo de funções, validações, requisitos, restrições...
const fs = require("fs"); // Importa o módulo de sistema de arquivos.

   function salvarusuario (usuario) { // Função para salvar o usuário em um arquivo JSON, e guardar os dados sem sobrescrever os dados antigos.
      let usuarios = [] // Cria um array vazio para armazenar os outros usuários, para não sobescrever os dados toda vez que rodar o programa novamente.
         if (fs.existsSync ("Dados_usuarios.json")) { // Verifica se o arquivo "Dados_usuarios.json" já existe
             const conteudo = fs.readFileSync ("Dados_usuarios.json", "utf-8"); // Lê o arquivo para verificar se os dados foram salvos corretamente, "utf-8" é a forma de interpretação.
             usuarios = JSON.parse(conteudo) // Transforma a string JSON em um objeto JS. Agora "usuarios" contém os usuarios antigos. String → Objeto. JSON -> JS
            }
// Se o rquivo existir, ele lê o conteúdo e transofmra JSON -> JS. Se ele não existir, o "usuarios" continua sendo [], ou seja, um array vazio, e da o push.

             usuarios.push (usuario); // Adiciona o usuario dentro da lista, do array usuarios, sem sobrescrever nem apagar os dados antigos.
             const dados = JSON.stringify(usuarios, null, 2); // Transforma o array "usuarios" em uma string JSON. Objeto → String. JS -> JSON.
             fs.writeFileSync ("Dados_usuarios.json", dados) // Escreve os dados e salva tudo no arquivo "Dados_usuarios.json".
                  console.log("\nDados salvos com sucesso.")
        }


function emailrepetido (email) { // Função que NÃO permite salvar um mesmo e-mail que já está inserido no sistema.
   let usuarios = [] 
      if (fs.existsSync("Dados_usuarios.json")) { 
      const conteudo = fs.readFileSync("Dados_usuarios.json", "utf-8"); 
      usuarios = JSON.parse(conteudo);  

      for (let i = 0; i < usuarios.length; i++) {  
         if (usuarios[i].E_mail === email) { // Condição que verifica se o email salvo daquele usuário é igual a string email. "usuarios[i].E_mail" → o e-mail salvo daquele usuário. email -> é uma string.
                    console.log("\nE-mail já cadastrado.");
                    return true; // Se o email ja estiver cadastrado, retorna true.
         }
      }                 
   }
    return false; // Se o email NÃO tiver cadastrado, ou seja, for um email novo, retorna false.
}


function nomeincorreto (nomecompleto) { // Função que NÃO permite que o campo "Nome Completo" fique com espaços em branco/ENTER
   if (nomecompleto.trim() === "" ) { // ".trim()" remove os espaços do começo e do fim da string " " e o enter.
      console.log("\nNome Completo inválido.");
      return true; // Se o nome NÃO for preenchido, retorna true.
   }

      if (!/^[A-Za-zÀ-ÿ ]+$/.test(nomecompleto)) { // Condição de NÃO permitir números nem símbolos, somente letras maiusculas, minusculas, e com acento.
         console.log ("\nNome Completo permite apenas letras.");
         return true; // Se o nome NÃO tiver nenhum simbolo ou numero, retorna true.
   }
   return false; // Se o nome for preenchido corretamente, retorna false.
}


function emailincorreto (email) { // Função que NÃO permite que o campo "E-mail" fique com espaços em branco/ENTER.
   if (email.trim() === "" ) { 
      console.log("\nE-mail inválido.");
      return true; // Se o email NÃO for preenchido, retorna true
   }

      if (!/^[A-Za-z0-9]+@(gmail|hotmail)\.com$/.test(email)) { // Condição que garante que se NÃO for digitado apenas letras e números no email antes do "@" e, logo após, tenha a formatação restritta a "@gmail.com" e "@hotmail.com".
         console.log ("\nE-mail inválido. Formatação incorreta.");
         return true; // Se o email NÃO tiver a formatação correta, retorna true.
   }
      return false; // Se o email for preenchido corretamente, retorna false.
 }


function cepincorreto (CEP) { // Função que permite salvar o CEP somente se tiver 8 digitos numericos seguidos, ou se tiver a seguinte formatação: XXXXX-XXX
   if(!/^(\d{5}-\d{3}|\d{8})$/.test(CEP)) { // Condição de permitir até 8 dígitos numericos no CEP (00213254 OU 09278-921, sem hífem ou com)
      console.log ("\nCEP inválido. Formatação incorreta.");
      return true; // Se o CEP NÃO tiver a formatação correta, retorna true.
   }
      return false; // Se o CEP for preenchido corretamente, retorna false.
}


async function buscarcep (CEP){ // Função para buscar o CEP via API e salvar os dados.
const retornodaapi = await fetch(`https://viacep.com.br/ws/${CEP}/json/`) // Espera a internet responder.
const dados = await retornodaapi.json(); // Espera converter a resposta em JSON.
// Utiliza await 2 vezes, pois, buscar e converter levam tempo.
return dados; // Retorna os dados da API.
} 


function cpfincorreto (CPF) { // Função que permite salvar o CPF somente se tiver 11 digitos númericos seguidos, ou seguindo essa formatação: XXX.XXX.XXX-XX
   if (!/^(\d{11}|\d{3}\.\d{3}\.\d{3}\-\d{2})$/.test(CPF)) { // Condição de permitir o CPF somente se tiver 11 digitos númericos seguidos, ou seguindo essa formatação: XXX.XXX.XXX-XX
      console.log("\nCPF inválido. Formatação incorreta.") 
      return true; // Se o CPF NÃO tiver a formatação correta, retorna true.
      }
      return false; // Se o CPF for preenchido corretamente, retorna false.
}


function listarusuarios () { // Função para listar os usuários cadastrados, mostrando o nome completo, email, cidade e estado.
   let usuarios = [] 
   if (fs.existsSync ("Dados_usuarios.json")) { 
   const conteudodoaquivo = fs.readFileSync ("Dados_usuarios.json", "utf-8") 
   usuarios = JSON.parse(conteudodoaquivo) 
}

      if (usuarios.length === 0) { // Verifica se o array está vazio, ou seja, se existe conteudo dentro do array. Essa é a forma certe de verificar se esta vazio ou não.
         console.log("\nNenhum usuário cadastrado.") 
         return false; // Se o array estiver vazio, ou seja, se NÃO tiver nenhum usuário cadastrado, retorna false.
   } 
   
      for (let i = 0; i < usuarios.length; i ++) { 

      console.log (`\nUsuário ${i + 1}`); // Enumera os usuários um por um.
      console.log("Nome Completo: ", usuarios[i]["Nome Completo"]); // Usa essa formatação por causa do espaço que tem "Nome Completo"
      console.log("E-mail: ", usuarios[i]["E_mail"]); // Usa essa formatação por causa do underline(_) que tem "E_mail"
      console.log("Cidade: ", usuarios[i].Cidade); // Usa essa formatação pelo motivo de não ter espaço nem simbolo, então é só usar o ponto "Cidade"
      console.log("Estado: ", usuarios[i].Estado); // Usa essa formatação pelo motivo de não ter espaço nem simbolo, então é só usar o ponto "Estado"
   } 
   return true; // Se o array tiver pelo menos um usuário cadastrado, ou seja, se tiver conteudo dentro do array, retorna true.
} 


function detalhesusuarios(numerodigitado) { // Função para mostrar os detalhes do usuário, mostrando todos os dados fornecidos, inclusive o endereço completo.
  let usuarios = [] 
   const detalhes = fs.readFileSync ("Dados_usuarios.json", "utf-8") 
   usuarios = JSON.parse(detalhes) 
   const indice = numerodigitado - 1 // O usuário digita o número do usuário, mas, como o array começa do 0, tem que subtrair 1 para mostrar o usuário correto.

      if (!/^(\d{1}|(\d{2}|(\d{3})))$/.test(numerodigitado))  { // Deixa o usuario digitar somente nessa formatação: "X" OU  "YY" OU "ZZZ"
      console.log("\nErro de formatação. Digite apenas o número do usuário.");
      return; // Retorna para a função que chamou, ou seja, para "detalhesusuarios", para o usuário digitar novamente.
   }       

         if (!usuarios[indice]) { // Verifica se existe um usuário no índice digitado.
         console.log(`\nUsuário ${indice + 1} não encontrado.`);
         return; // Retorna para a função que chamou, ou seja, para "detalhesusuarios", para o usuário digitar novamente.

   } else { 

   console.log(`\nUsuario ${indice + 1} `); // Mostra o número do usuário, usando o índice + 1 para mostrar o número correto, já que o índice começa do 0.
   console.log("Nome Completo: ", usuarios[indice]["Nome Completo"] ); // Usa essa formatação por causa do espaço que tem "Nome Completo". Mostra o nome completo do usuário do índice digitado.
   console.log("E-mail: ", usuarios[indice]["E_mail"]); // Usa essa formatação por causa do underline(_) que tem "E_mail". Mostra o e-mail do usuário do índice digitado.
   console.log("CPF: ", usuarios[indice].CPF); // Usa essa formatação pelo motivo de não ter espaço nem simbolo, então é só usar o ponto "CPF". Mostra o CPF do usuário do índice digitado.
   console.log("CEP: ", usuarios[indice].CEP); // Usa essa formatação pelo motivo de não ter espaço nem simbolo, então é só usar o ponto "CEP". Mostra o CEP do usuário do índice digitado.
   console.log("Rua: ", usuarios[indice].Rua); // Usa essa formatação pelo motivo de não ter espaço nem simbolo, então é só usar o ponto "Rua". Mostra a rua do usuário do índice digitado.
   console.log("Bairro: ", usuarios[indice].Bairro); // Usa essa formatação pelo motivo de não ter espaço nem simbolo, então é só usar o ponto "Bairro". Mostra o bairro do usuário do índice digitado.
   console.log("Cidade: ", usuarios[indice].Cidade); // Usa essa formatação pelo motivo de não ter espaço nem simbolo, então é só usar o ponto "Cidade". Mostra a cidade do usuário do índice digitado.
   console.log("Estado: ", usuarios[indice].Estado); // Usa essa formatação pelo motivo de não ter espaço nem simbolo, então é só usar o ponto "Estado". Mostra o estado do usuário do índice digitado.
   } 
}


function usuarioincorreto (usuariodigitado) { // Função para validar o número do usuário digitado, verificando se o número corresponde a um usuário cadastrado, e se o número digitado tem a formatação correta, ou seja, se é um número de 1 a 999, sem letras nem símbolos.
   let usuario = [] 
   const conteudodoaquivo = fs.readFileSync ("Dados_usuarios.json", "utf-8")
   usuario = JSON.parse(conteudodoaquivo) 
   const indice = usuariodigitado - 1

      if (!usuario[indice]){  
         console.log("\nUsuário não encontrado. Digite apenas o número do usuário cadastrado.");
         return true; // Se o usuário digitar um número que NÃO corresponde a nenhum usuário cadastrado, retorna true.
    
   } else {

      console.log(`\nUsuário ${indice + 1} encontrado no banco de dados.`);

      console.log(`\nUsuário ${indice + 1}`);
      console.log("Nome Completo: ", usuario[indice]["Nome Completo"]); 
      console.log("E-mail: ", usuario[indice]["E_mail"]); 
      console.log("CPF: ", usuario[indice].CPF); 
      console.log("CEP: ", usuario[indice].CEP); 
      console.log("Rua: ", usuario[indice].Rua); 
      console.log("Bairro: ", usuario[indice].Bairro); 
      console.log("Cidade: ", usuario[indice].Cidade); 
      console.log("Estado: ", usuario[indice].Estado); 
      }
      return false; // Se o usuário digitar um número que corresponde a um usuário cadastrado, retorna false
} 


function dadoincorreto(dado){ // Função para validar o dígito correto para o campo de editar o dado de um usuário.

   if (!/^[1-4]$/.test(dado)) { // Permite somente um dígito númerico entre 1 e 4, correspondente ao Nome Completo, E-mail, CPF e CEP.
      console.log("\nDigite apenas a numeração do dado que deseja editar.");
      return true // Se o usuário digitar um número que NÃO corresponde a nenhum campo, retorna true.
   }
   return false; // Se o usuário digitar um número que corresponde a um campo, retorna false.
}


function validarcampodadousuario (campodigitado) { // Função para validar o campo do dado do usuário que ele deseja editar, verificando se o número digitado corresponde a um campo existente, e se o campo digitado é válido para ser editado. 
   const campos = { // Objeto que relaciona o número digitado com o campo correspondente do usuário.
   "1": "Nome Completo",
   "2": "E_mail",
   "3": "CPF",
   "4": "CEP",
   }
   return campos[campodigitado] // Retorna o campo correspondente ao número/campo digitado pelo usuário.
}


function substituiresalvardado (usuariodigitado, campoescolhido, novodado) { // Função para substituir o dado antigo do usuário pelo novo dado fornecido pelo usuário, no campo escolhido, e depois salvar os dados no arquivo JSON, sem sobrescrever os dados antigos.
   const leraquivo = fs.readFileSync ("Dados_usuarios.json", "utf-8") 
   const usuarios = JSON.parse(leraquivo) 
   const indice = usuariodigitado - 1 
   
   usuarios[indice][campoescolhido] = novodado; // Substitui o dado antigo do usuário pelo novo dado fornecido pelo usuário, no campo escolhido.
   
   const dados = JSON.stringify(usuarios, null, 2) 
   fs.writeFileSync("Dados_usuarios.json", dados)
}


function atualizarendereco (usuariodigitado, novocep, novoendereco) { // Função para atualizar o endereço do usuário, substituindo o CEP antigo pelo novo CEP fornecido pelo usuário, e os outros dados do endereço (rua, bairro, cidade e estado) pelos dados retornados pela API, e depois salvar os dados no arquivo JSON, sem sobrescrever os dados antigos.
   const lerarquivo = fs.readFileSync("Dados_usuarios.json", "utf-8")
   const usuarios = JSON.parse(lerarquivo)
   const indice = usuariodigitado - 1

      usuarios[indice]["CEP"] = novocep // Substitui o CEP antigo do usuário pelo novo CEP fornecido pelo usuário.
      usuarios[indice]["Rua"] = novoendereco.logradouro  // Substitui a rua antiga do usuário pela nova rua retornada pela API.
      usuarios[indice]["Bairro"] = novoendereco.bairro // Substitui o bairro antigo do usuário pelo novo bairro retornado pela API.
      usuarios[indice]["Cidade"] = novoendereco.localidade // Substitui a cidade antiga do usuário pela nova cidade retornada pela API.
      usuarios[indice]["Estado"] = novoendereco.uf // Substitui o estado antigo do usuário pelo novo estado retornado pela API.
   
   const dados = JSON.stringify(usuarios, null, 2)
   fs.writeFileSync("Dados_usuarios.json",dados )
}


function buscarexcluirusuario (usuariodigitado) { // Função para buscar o usuário que o usuário deseja excluir.
   const leraquivo = fs.readFileSync("Dados_usuarios.json", "utf-8")
   const usuario = JSON.parse(leraquivo)
   const indice = usuariodigitado - 1

   if(!usuario[indice]) {
      console.log("\nUsuário não encontrado. Digite apenas o número do usuário cadastro que você deseja excluir")
      return true; // Se o usuário digitar um número que NÃO corresponde a nenhum usuário cadastrado, retorna true.

} else {

   console.log(`\nUsuário ${indice + 1} encontrado no banco de dados.`);

   console.log("\nUsuário: ", usuario[indice]);
   console.log("Nome Completo:", usuario[indice]["Nome Completo"]);
   console.log("E-mail: ", usuario[indice]["E_mail"]);
   console.log("CPF: ", usuario[indice].CPF);
   console.log("CEP: ", usuario[indice].CEP);
   console.log("Rua: ", usuario[indice].Rua);
   console.log("Bairro: ", usuario[indice].Bairro);
   console.log("Cidade ", usuario[indice].Cidade);
   console.log("Estado: ", usuario[indice].Estado);
      }
   return false; // Se o usuário digitar um número que corresponde a um usuário cadastrado, retorna false.
}


function excluirusuario (usuariodigitado) { // Função para excluir o usuário, removendo o usuário do array de usuários, e depois salvar os dados no arquivo JSON, sem sobrescrever os dados antigos.
   const leraquivo = fs.readFileSync("Dados_usuarios.json", "utf-8")
   const usuario = JSON.parse(leraquivo)
   const indice = usuariodigitado - 1

   usuario.splice(indice, 1); // Remove o usuário do array de usuários, usando o "splice", que remove um elemento do array a partir do índice digitado pelo usuário, e o número 1 indica que é para remover apenas um elemento.
   const dados = JSON.stringify(usuario, null, 2)
   fs.writeFileSync("Dados_usuarios.json", dados)
}


 module.exports = {salvarusuario, 
   nomeincorreto,
   emailincorreto, emailrepetido,
   cepincorreto, buscarcep, 
   cpfincorreto, 
   listarusuarios, detalhesusuarios,
   usuarioincorreto, dadoincorreto, validarcampodadousuario,
   substituiresalvardado, atualizarendereco,
   buscarexcluirusuario, excluirusuario
   }; // Módulo para exportar essas funções para o arquivo "Campos_usuarios.js"