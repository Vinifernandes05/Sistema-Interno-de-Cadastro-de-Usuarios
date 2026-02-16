// Arquivo de funções, validações, requisitos, restrições...
const fs = require("fs"); // Importa o módulo de sistema de arquivos

   function salvarusuario (usuario) { // Função para salvar o usuário em um arquivo JSON, e guardar os dados sem sobrescrever os dados antigos
// Temos que acessar o arquivo e os dados nele, se existir ambos, temos que transforma de JSON para JS. E transforma de volta de JS para JSON para salvar os dados na pasta e seguir em diante.
            let usuarios = []; // Cria um array vazio para armazenar os outros usuários, para nao sobescrever os dados toda vez que rodar o programa novamente

            if (fs.existsSync ("Dados_usuarios.json")) { // Verifica se o arquivo Dados_usuarios.json já existe
             const conteudo = fs.readFileSync ("Dados_usuarios.json", "utf-8"); // Lê o arquivo para verificar se os dados foram salvos corretamente, "utf-8" é a forma de interpretação
             usuarios = JSON.parse(conteudo) // Transforma a string JSON em um objeto JS. Agora "usuarios" contém os usuarios antigos. String → Objeto. JSON -> JS
            }
// Se o rquivo existir, ele lê o conteúdo e transofmra JSON -> JS. Se ele não existir, o "usuarios" continua sendo [], ou seja, um array vazio, e da o push

             usuarios.push (usuario); // Adiciona o usuario dentro da lista, do array usuarios, sem sobrescrever nem apagar os dados antigos
             const dados = JSON.stringify(usuarios, null, 2); // Transforma o array "usuarios" em uma string JSON. Objeto → String. JS -> JSON
             fs.writeFileSync ("Dados_usuarios.json", dados) // Escreve os dados no arquivo Dados_usuarios.json. Salva tudo de volta no arquivo
                  console.log("\nDados salvos com sucesso.")
        }


function emailrepetido (email) { // Função que não permite salvar um mesmo e-mail que já está inserido no sistema
   let usuarios = [] // Cria um array vazio de usuarios, uma lsita vazia
   if (fs.existsSync("Dados_usuarios.json")) { // Verifica se o arquivo Dados_usuarios.json já existe
      const conteudo = fs.readFileSync("Dados_usuarios.json", "utf-8"); // Lê o arquivo para verificar se os dados foram salvos corretamente, "utf-8" é a forma de interpretação
      usuarios = JSON.parse(conteudo);  // Transforma a string JSON em um objeto JS. Agora "usuarios" contém os usuarios antigos. String → Objeto. JSON -> JS

      for (let i = 0; i < usuarios.length; i++) {  // Loop que percorre todo o array
         if (usuarios[i].E_mail === email) { // Condição que verifica se o email salvo daquele usuário é igual a string email. "usuarios[i].E_mail" → o e-mail salvo daquele usuário. email -> é uma string

                    console.log("\nE-mail já cadastrado.");
                     return true; // Se o email ja estiver cadastrado, retorna true
         }
      }                 
   }
    return false; // Se o email não tiver cadastrado, ou seja, for um email novo, retorna false
// Inserir no código o "return false;" após o fechamento das chaves do "for", pois, ele tem que verificar todos os email, e não so o primeiro. pois não sabemos qual a ordem do usuario que está com o email igual 
}


function nomeincorreto (nomecompleto) { // Função que não permite que o campo "Nome Completo" fique com espaços em branco/ENTER
   if (nomecompleto.trim() === "" ) { // Condição de se o nome for em branco, ele da uma mensagem de erro e não salva. O ".trim()" remove os espaços do começo e do fim da string " " e o enter
      console.log("\nNome Completo inválido.");
      return true; // Se o nome nao for preenchido, retorna true
   }

   if (!/^[A-Za-zÀ-ÿ ]+$/.test(nomecompleto)) { // Condição de não permitir números nem símbolos, somente letras maiusculas, minusculas, e com acento
// "/ ... /" → Indicam que isso é uma expressão regular (Regex). Tudo que está entre as barras é a regra de validação.
// "^" → começo da string, impede caracteres antes do padrão.
// "[ ]" → Para escolher letras, caracteres permitidos. 
// "A-Z" → Letras maiusculas.
// "a-z" → Letras minusculas.  
// "À-ÿ" → Letras acentuadas.
// O espaço antes do final dos "[]" significa que pode conter espaços.
// "+" → Um ou mais caracteres, pode repetir os caracteres várias vezes. 
// "$" → Diz que “a validação termina aqui”, não permite nada após os caracteres.

console.log ("\nNome Completo permite apenas letras.");
      return true; // Se o nome NÃO tiver nenhum simbolo ou numero, retorna verdadeiro
   }
   return false; // Se o nome for preenchido corretamente, retorna false
}


function emailincorreto (email) { // Função que não permite que o campo "E-mail" fique com espaços em branco/ENTER
   if (email.trim() === "" ) { // Condição de não deixa o usuario cadastrar o email em branco. O "".trim()"" remove os espaços do começo e do fim da string " " e o enter
      console.log("\nE-mail inválido.");
      return true; // Se o email não for preenchido, retorna true
   }

    if (!/^[A-Za-z0-9]+@(gmail|hotmail)\.com$/.test(email)) { // Condição que garante que se nao for digitado apenas letras e números no email antes do "@" e, logo após, tenha a formatação restritta a "@gmail.com" e "@hotmail.com" garantindo, pelo "$" que nao seja ivalidado qualquer digito após o ".com", a função vai dar true
// "/ ... /" → Indicam que isso é uma expressão regular (Regex). Tudo que está entre as barras é a regra de validação
// "^" → começo da string, impede caracteres antes do padrão.
// "[ ]" → Para escolher letras, caracteres permitidos.
// "A-Z" → Letras maiusculas.
// "a-z" → Letras minusculas.
// "0-9" → Números. 
// "+" → Um ou mais caracteres, não tem limite de tamanho definido.
// "@" → Caractere literal, que exige a existência do @ exatamente nesta posição.
// "( )" → Para escolher palavras específicas. 
// "\." → O ponto é especial, mas, para virar literal (.), usa-se smpre a barra antes.
// "com" → Texto literal.
// "$" → Diz que “a validação termina aqui”, Não permite nada após ".com". 

      console.log ("\nE-mail inválido. Formatação incorreta.");
      return true;
   }
      return false; // Se o email for preenchido corretamente, retorna false
 }


function cepincorreto (CEP) { // Função que permite salvar o CEP somente se tiver 8 digitos numericos seguidos, ou se tiver nessa formatação: XXXXX-XXX

   if(!/^(\d{5}-\d{3}|\d{8})$/.test(CEP)) { // Condição de permitir até 8 digitos numericos no CEP (00213254 OU 09278-921, sem hífem ou com)
// "/ ... /" → Indicam que isso é uma expressão regular (Regex). Tudo que está entre as barras é a regra de validação
// "^" → Começo da string, impede caracteres antes do padrão
// "\d" → Qualquer digito de 0 a 9, equivalente ao "[0-9]"
// { } → Define a quantidade exata de repetições. {5} → Exatamente 5 digitos
// "-" → Hífen literal, que exige ele exatamente nesta posição
// "|" → Ou uma coisa ou outra, ou seja, ou 5 digitos, um hífen separando, e depois 3 digitos, OU 8 digitos seguidos 
// "$" → Diz que “a validação termina aqui”, Não permite nada após os 8 digitos 
//“Começa, depois vem 5 dígitos, um hífen, 3 dígitos OU vêm 8 dígitos seguidos, e termina.”

      console.log ("\nCEP inválido. Formatação incorreta.");
      return true; // Se o CEP não tiver a formatação correta, retorna true
   }
      return false; // Se o CEP for preenchido corretamente, retorna false
}


async function buscarcep (CEP){ // Função para buscar o CEP via API e salvar os dados
const retornodaapi = await fetch(`https://viacep.com.br/ws/${CEP}/json/`) // Espera a internet responder e guarda a resposta em "response"
// const retornodaapi = await fetch("https://viacep.com.br/ws/" + CEP + "/json/") // Outra forma de escrever o CEP dentro.
const dados = await retornodaapi.json(); // Espera converter a resposta em JSON
// Utiliza await 2 vezes, pois, buscar e converter levam tempo
return dados; 
} 


function cpfincorreto (CPF) { 
   if (!/^(\d{11}|\d{3}\.\d{3}\.\d{3}\-\d{2})$/.test(CPF)) { // Condição de permitir o CPF somente se tiver 11 digitos númericos seguidos, ou seguindo essa formatação: XXX.XXX.XXX-XX
   // "/ ... /" → Indicam que isso é uma expressão regular (Regex). Tudo que está entre as barras é a regra de validação
   // "^" → Começo da string, impede caracteres antes do padrão
   // "\d" → Qualquer digito de 0 a 9, equivalente ao "[0-9]"
   // { } → Define a quantidade exata de repetições. {11} → Exatamente 11 digitos
   // "\." → O ponto é especial, mas, para virar literal (.), usa-se smpre a barra antes.
   // "\-" → O hífen é especial, mas, para virar literal (-), usa-se smpre a barra antes.
   // "|" → Ou uma coisa ou outra, ou seja, ou 11 digitos seguidos OU 3 digitos, um ponto, 3 digitos, um ponto, 3 digitos, um hífen, e 2 digitos
      
      console.log("\nCPF inválido. Formatação incorreta.") // Se o CPF não tiver a formatação correta, mostra essa mensagem de erro
      return true; // Se o CPF não tiver a formatação correta, retorna true
      }
      return false; // Se o CPF for preenchido corretamente, retorna false
}


function listarusuarios () { // Função para listar os usuários cadastrados, mostrando o nome completo, email, cidade e estado
let usuarios = [] // Se o arquivo não existir ou estiver vazio, pelo menos usuarios existe. Se o arquivo existe, ele vem do JSON, se não existir, fica vazio

if (fs.existsSync ("Dados_usuarios.json")) { // Verifica se o arquivo existe
   const conteudodoaquivo = fs.readFileSync ("Dados_usuarios.json", "utf-8") // Lê o arquivo JSON
   usuarios = JSON.parse(conteudodoaquivo) // Transforma o conteudo de JSON -> JS
}

   if (usuarios.length === 0) { // Verifica se o array esta vazio, ou seja, se existe conteudo dentro do array. Essa é a forma certe de verificar se esta vazio ou não
      console.log("\nNenhum usuário cadastrado.") // Se o array estiver vazio, ou seja, se não tiver nenhum usuário cadastrado, mostra essa mensagem
      return false;
   } 
   
      for (let i = 0; i < usuarios.length; i ++) { // Percorre o tamanho do array completo
      console.log (`\nUsuário ${i + 1}`); // Enumera os ususarios um por um
      console.log("Nome Completo: ", usuarios[i]["Nome Completo"]); // Usa essa formatação por causa do espaço que tem "Nome Completo"
      console.log("E-mail: ", usuarios[i]["E_mail"]); // Usa essa formatação por causa do underline(_) que tem "E_mail"
      console.log("Cidade: ", usuarios[i].Cidade); // Usa essa formatação por causa de não ter espaço nem simbolo, então é só usar o ponto mesmo "Cidade"
      console.log("Estado: ", usuarios[i].Estado); // Usa essa formatação por causa de não ter espaço nem simbolo, então é só usar o ponto mesmo "Estado"
   } // Fecha o loop que percorre o array de usuários, mostrando os dados um por um
   return true;
} // Fecha a verificação de se o arquivo existe


function detalhesusuarios(numerodigitado) { // Função para mostrar os detalhes do usuário, mostrando todos os dados fornecidos, inclusive o endereço completo
  let usuarios = [] // Se o arquivo não existir ou estiver vazio, pelo menos usuarios existe. Se o arquivo existe, ele vem do JSON, se não existir, fica vazio
   const detalhes = fs.readFileSync ("Dados_usuarios.json", "utf-8") // Lê o arquivo JSON, para pegar os dados e mostrar os detalhes do usuário. Mesmo que o arquivo esteja vazio, ele lê, e o "usuarios" fica vazio, e mostra a mensagem de nenhum usuário cadastrado
   usuarios = JSON.parse(detalhes) // Transforma o conteudo de JSON -> JS, para trabalhar com os dados e mostrar os detalhes do usuário
   const indice = numerodigitado - 1 // O usuário digita o número do usuário, mas, como o array começa do 0, tem que subtrair 1 para mostrar o usuário correto. Exemplo: se digitar 1, tem que mostrar o usuário do indice 0, que é o primeiro usuário

      if (!/^(\d{1}|(\d{2}|(\d{3})))$/.test(numerodigitado))  { // Deixa o usuario digitar somente nessa formatação: "X" OU  "YY" OU "ZZZ"
   // if(!/^\d{1,3}$/.test(numerodigitado)) 
// "/ ... /" → Indicam que isso é uma expressão regular (Regex). Tudo que está entre as barras é a regra de validação
// "^" → Começo da string, impede caracteres antes do padrão
// "\d" → Qualquer digito de 0 a 9, equivalente ao "[0-9]"
// "{ }" → Define a quantidade exata de repetições. {1} → Exatamente 1 digito, {2} → Exatamente 2 digitos, {3} → Exatamente 3 digitos
// "|" → Ou uma coisa ou outra, ou seja, ou 1 digito, ou 2 digitos, ou 3 digitos
// "$" → Diz que “a validação termina aqui”, Não permite nada após o número digitado.

      console.log("\nErro de formatação. Digite apenas o número do usuário."); // Se o usuário digitar algo diferente de um número, ou um número com mais de 3 dígitos, mostra essa mensagem de erro
      return; // Retorna para a função que chamou, ou seja, para o menu de detalhes, para o usuário digitar novamente
   }       

   if (!usuarios[indice]) { // Verifica se existe um usuário no índice digitado. Se não existir, mostra a mensagem de que o usuário não foi encontrado. O "!" é para negar a condição, ou seja, se não existir um usuário naquele índice, mostra a mensagem de erro
      console.log(`\nUsuário ${indice + 1} não encontrado.`); // Se o usuário digitar um número que não corresponde a nenhum usuário cadastrado, mostra essa mensagem de erro. O "indice + 1" é para mostrar o número do usuário correto, já que o índice começa do 0
      return; // Retorna para a função que chamou, ou seja, para o menu de detalhes, para o usuário digitar novamente

   } else { 

   console.log(`\nUsuario ${indice + 1} `); // Mostra o número do usuário, usando o índice + 1 para mostrar o número correto, já que o índice começa do 0
   console.log("Nome Completo: ", usuarios[indice]["Nome Completo"] ); // Usa essa formatação por causa do espaço que tem "Nome Completo". Mostra o nome completo do usuário do índice digitado
   console.log("E-mail: ", usuarios[indice]["E_mail"]); // Usa essa formatação por causa do underline(_) que tem "E_mail". Mostra o e-mail do usuário do índice digitado
   console.log("CPF: ", usuarios[indice].CPF); // Usa essa formatação por causa de não ter espaço nem simbolo, então é só usar o ponto mesmo "CPF". Mostra o CPF do usuário do índice digitado
   console.log("CEP: ", usuarios[indice].CEP); // Usa essa formatação por causa de não ter espaço nem simbolo, então é só usar o ponto mesmo "CEP". Mostra o CEP do usuário do índice digitado
   console.log("Rua: ", usuarios[indice].Rua); // Usa essa formatação por causa de não ter espaço nem simbolo, então é só usar o ponto mesmo "Rua". Mostra a rua do usuário do índice digitado
   console.log("Bairro: ", usuarios[indice].Bairro); // Usa essa formatação por causa de não ter espaço nem simbolo, então é só usar o ponto mesmo "Bairro". Mostra o bairro do usuário do índice digitado
   console.log("Cidade: ", usuarios[indice].Cidade); // Usa essa formatação por causa de não ter espaço nem simbolo, então é só usar o ponto mesmo "Cidade". Mostra a cidade do usuário do índice digitado
   console.log("Estado: ", usuarios[indice].Estado); // Usa essa formatação por causa de não ter espaço nem simbolo, então é só usar o ponto mesmo "Estado". Mostra o estado do usuário do índice digitado

   } 
}


function usuarioincorreto (usuariodigitado) { // Função para validar o número do usuário digitado, verificando se o número corresponde a um usuário cadastrado, e se o número digitado tem a formatação correta, ou seja, se é um número de 1 a 999, sem letras nem símbolos
   let usuario = [] // Se o arquivo não existir ou estiver vazio, pelo menos usuarios existe. Se o arquivo existe, ele vem do JSON, se não existir, fica vazio
   const conteudodoaquivo = fs.readFileSync ("Dados_usuarios.json", "utf-8") // Lê o arquivo JSON, para pegar os dados e mostrar os detalhes do usuário. Mesmo que o arquivo esteja vazio, ele lê, e o "usuarios" fica vazio, e mostra a mensagem de nenhum usuário cadastrado
   usuario = JSON.parse(conteudodoaquivo) // Transforma o conteudo de JSON -> JS, para trabalhar com os dados e mostrar os detalhes do usuário. Agora "usuario" contém os usuarios antigos. String → Objeto. JSON -> JS
   const indice = usuariodigitado - 1 // O usuário digita o número do usuário, mas, como o array começa do 0, tem que subtrair 1 para mostrar o usuário correto. Exemplo: se digitar 1, tem que mostrar o usuário do indice 0, que é o primeiro usuário

   if (!usuario[indice]){ // Verifica se existe um usuário no índice digitado. Se não existir, mostra a mensagem de que o usuário não foi encontrado. O "!" é para negar a condição, ou seja, se não existir um usuário naquele índice, mostra a mensagem de erro
      console.log("\nUsuário não encontrado. Digite apenas o número do usuário cadastrado."); // Se o usuário digitar um número que não corresponde a nenhum usuário cadastrado, mostra essa mensagem de erro. O "indice + 1" é para mostrar o número do usuário correto, já que o índice começa do 0
      return true; // Se o usuário digitar um número que não corresponde a nenhum usuário cadastrado, retorna true
    
   } else {
      console.log(`\nUsuário ${indice + 1} encontrado no banco de dados.`);

      console.log(`\nUsuário ${indice + 1}`);
      console.log("Nome Completo: ", usuario[indice]["Nome Completo"]); // Usa essa formatação por causa do espaço que tem "Nome Completo". Mostra o nome completo do usuário do índice digitado
      console.log("E-mail: ", usuario[indice]["E_mail"]); // Usa essa formatação por causa do underline(_) que tem "E_mail". Mostra o e-mail do usuário do índice digitado
      console.log("CPF: ", usuario[indice].CPF); // Usa essa formatação por causa de não ter espaço nem simbolo, então é só usar o ponto mesmo "CPF". Mostra o CPF do usuário do índice digitado
      console.log("CEP: ", usuario[indice].CEP); // Usa essa formatação por causa de não ter espaço nem simbolo, então é só usar o ponto mesmo "CEP". Mostra o CEP do usuário do índice digitado
      console.log("Rua: ", usuario[indice].Rua); // Usa essa formatação por causa de não ter espaço nem simbolo, então é só usar o ponto mesmo "Rua". Mostra a rua do usuário do índice digitado
      console.log("Bairro: ", usuario[indice].Bairro); // Usa essa formatação por causa de não ter espaço nem simbolo, então é só usar o ponto mesmo "Bairro". Mostra o bairro do usuário do índice digitado
      console.log("Cidade: ", usuario[indice].Cidade); // Usa essa formatação por causa de não ter espaço nem simbolo, então é só usar o ponto mesmo "Cidade". Mostra a cidade do usuário do índice digitado
      console.log("Estado: ", usuario[indice].Estado); // Usa essa formatação por causa de não ter espaço nem simbolo, então é só usar o ponto mesmo "Estado". Mostra o estado do usuário do índice digitado
      }
      return false; // Se o usuário digitar um número que corresponde a um usuário cadastrado, retorna false
} 


function dadoincorreto (dado){ // Função para validar o campo do dado do usuário que ele deseja editar, verificando se o número digitado corresponde a um campo existente, e se o campo digitado é válido para ser editado. Exemplo: se digitar 1, tem que ser o "Nome Completo", se digitar 2, tem que ser o "E-mail", e assim por diante.
   if(!/^[1-8]$/.test(dado)) { 
   // "/ ... /" → Indicam que isso é uma expressão regular (Regex). Tudo que está entre as barras é a regra de validação
   // "^" → Começo da string, impede caracteres antes do padrão
   // "[ ]" → Para escolher caracteres permitidos.
   // "1-8" → Permite apenas os números de 1 a 8, ou seja, os campos que o usuário pode escolher para editar. O número 8 é para o campo "Estado", que é o último campo do usuário, e o número 1 é para o campo "Nome Completo", que é o primeiro campo do usuário. Se digitar um número menor que 1 ou maior que 8, ou um caractere que não seja número, a função vai dar true, ou seja, vai mostrar a mensagem de erro e pedir para digitar novamente.
   // "$" → Diz que “a validação termina aqui”, Não permite nada após o número digitado.

      console.log("\nErro de formatação. Digite apenas o número correspondente ao dado que deseja editar."); // Se o usuário digitar algo diferente de um número entre 1 e 8, mostra essa mensagem de erro
      return true; // Se o usuário digitar algo diferente de um número entre 1 e 8, retorna true
   }
   return false; // Se o usuário digitar um número entre 1 e 8, retorna false
} 


function validarcampodadousuario (campodigitado) { // Função para validar o campo do dado do usuário que ele deseja editar, verificando se o número digitado corresponde a um campo existente, e se o campo digitado é válido para ser editado. Exemplo: se digitar 1, tem que ser o "Nome Completo", se digitar 2, tem que ser o "E-mail", e assim por diante.  
   const campos = { // Objeto que relaciona o número digitado com o campo correspondente do usuário. Exemplo: se digitar 1, tem que ser o "Nome Completo", se digitar 2, tem que ser o "E-mail", e assim por diante. E depois, tem que validar se o dado digitado para substituir aquele campo é válido, ou seja, se for o nome completo, tem que validar com a função nomeincorreto, se for email, tem que validar com a função emailincorreto, e assim por diante.
   "1": "Nome Completo",
   "2": "E_mail",
   "3": "CPF",
   "4": "CEP",
   }
   return campos[campodigitado] // Retorna o campo correspondente ao número/campo digitado pelo usuário, para ser usado como parâmetro na função "editardado", para saber qual campo do usuário deve ser editado com o novo dado fornecido pelo usuário. Exemplo: se digitar 1, retorna "Nome Completo", se digitar 2, retorna "E-mail", e assim por diante.
}


function substituiresalvardado (usuariodigitado, campoescolhido, novodado) { // Função para substituir o dado antigo do usuário pelo novo dado fornecido pelo usuário, no campo escolhido, e depois salvar os dados no arquivo JSON, sem sobrescrever os dados antigos. Exemplo: se o usuário escolher editar o campo "E-mail" do usuário 1, ele tem que digitar o número 2 para escolher o campo "E-mail", e depois digitar o novo e-mail para substituir o e-mail antigo do usuário 1, e depois salvar os dados no arquivo JSON, sem sobrescrever os dados antigos.
   const leraquivo = fs.readFileSync ("Dados_usuarios.json", "utf-8") // Lê o arquivo JSON, para pegar os dados e mostrar os detalhes do usuário. Mesmo que o arquivo esteja vazio, ele lê, e o "usuarios" fica vazio, e mostra a mensagem de nenhum usuário cadastrado
   const usuarios = JSON.parse(leraquivo) // Transforma o conteudo de JSON -> JS, para trabalhar com os dados e mostrar os detalhes do usuário. Agora "usuarios" contém os usuarios antigos. String → Objeto. JSON -> JS
   const indice = usuariodigitado - 1 // O" ususariodigitado" não e o indice. Se ele digitou 1, significa o primeiro array, ou seja, 0. O usuário digita o número do usuário, mas, como o array começa do 0, tem que subtrair 1 para mostrar o usuário correto. Exemplo: se digitar 1, tem que mostrar o usuário do indice 0, que é o primeiro usuário
   
   usuarios[indice][campoescolhido] = novodado; // Substitui o dado antigo do usuário pelo novo dado fornecido pelo usuário, no campo escolhido. Exemplo: se o usuário escolher editar o campo "E-mail" do usuário 1, ele tem que digitar o número 2 para escolher o campo "E-mail", e depois digitar o novo e-mail para substituir o e-mail antigo do usuário 1, e depois salvar os dados no arquivo JSON, sem sobrescrever os dados antigos. O "campoescolhido" é o valor do campo escolhido pelo usuário para editar, e é usado como parâmetro para a função "editardado", para saber qual campo do usuário deve ser editado com o novo dado fornecido pelo usuário. Exemplo: se digitar 1, retorna "Nome Completo", se digitar 2, retorna "E-mail", e assim por diante.
   
   const dados = JSON.stringify(usuarios, null, 2) 
   fs.writeFileSync("Dados_usuarios.json", dados) // Escreve os dados no arquivo Dados_usuarios.json. Salva tudo de volta no arquivo

}


function atualizarendereco (usuariodigitado, novocep, novoendereco) {
   const lerarquivo = fs.readFileSync("Dados_usuarios.json", "utf-8")
   const usuarios = JSON.parse(lerarquivo)
   const indice = usuariodigitado - 1

      usuarios[indice]["CEP"] = novocep
      usuarios[indice]["Rua"] = novoendereco.logradouro    
      usuarios[indice]["Bairro"] = novoendereco.bairro
      usuarios[indice]["Cidade"] = novoendereco.localidade
      usuarios[indice]["Estado"] = novoendereco.uf
   
   const dados = JSON.stringify(usuarios, null, 2)
   fs.writeFileSync("Dados_usuarios.json",dados )
}


function buscarexcluirusuario (usuariodigitado) {
const leraquivo = fs.readFileSync("Dados_usuarios.json", "utf-8")
const usuario = JSON.parse(leraquivo)
const indice = usuariodigitado - 1

if(!usuario[indice]) {
   console.log("\nUsuário não encontrado. Digite apenas o número do usuário cadastro que você deseja excluir")
   return true;

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
   return false;
}

function excluirusuario (usuariodigitado) {
   const leraquivo = fs.readFileSync("Dados_usuarios.json", "utf-8")
   const usuario = JSON.parse(leraquivo)
   const indice = usuariodigitado - 1

   usuario.splice(indice, 1);
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