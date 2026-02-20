// Arquivo de interação com o usuário, perguntas...
const readline = require ("readline"); // Importa o módulo readline para ler entrada do usuário.
const {salvarusuario,
       nomeincorreto, 
       emailincorreto, emailrepetido, 
       cepincorreto, buscarcep,
       cpfincorreto, 
       listarusuarios, detalhesusuarios,
       usuarioincorreto, dadoincorreto, validarcampodadousuario, 
       substituiresalvardado, atualizarendereco,
       buscarexcluirusuario, excluirusuario
       } = require("./Validar_usuarios"); // Direciona as funções que estão sendo exportadas para este arquivo.

       const rl = readline.createInterface ({ // Cria uma interface de leitura.
    input: process.stdin, // Define a entrada padrão como o teclado.
    output: process.stdout // Define a saída padrão como o console.
})


function deletarusuario () { // Função que permiti deletar um usuário. 
    
    console.log("\n1 - Excluir permanentemente um usuário cadastrado.");
    console.log("2 - Retornar ao menu de opções.");

    rl.question("\nDigite a opção desejada: ", (opcao) => {

    switch (opcao) {

        case"1": rl.question("\nDigite a numeração do usuario que deseja excluir: ", (usuariodigitado) => {
            
            if (buscarexcluirusuario(usuariodigitado)) {  // Verifica se o usuário informado existe no banco. 
                deletarusuario(); // Caso não exista o usuário no banco, reinicia o fluxo e volta para as opções iniciais da função.
                return;
            }

        console.log(`\n1 - Sim, desejo exlcuir o usuario. ${usuariodigitado}`);
        console.log(`2 - Não desejo exluir o usuário ${usuariodigitado}, cancelar operação.`);

            rl.question(`\nDigite a opção para confirmar a exclusão do usuário ${usuariodigitado}: `, (confirmacao) => {
        
        switch (confirmacao) { 
            
            case"1": 
            console.log(`\nUsuário ${usuariodigitado} excluido do banco de dados com sucesso.`);
            
             if (excluirusuario(usuariodigitado)) { // Chama a função de excluir o usuário para confirmar a exclusão.
                deletarusuario(); // Retorna para as opções iniciais da função de exclusão.
                return;
            }

            menulooping();
                break;
        
            case"2": console.log(`\nSaindo da operação... Exclusão do usuário ${usuariodigitado} cancelada.`);
            deletarusuario();
                break;
            
            default: console.log("\nComando Inválido");
            deletarusuario();
                break;
        }

            })

        })
        break;


        case"2":
        menulooping();
        break;

    default: console.log("\nComando Inválido.")
    deletarusuario();
    return;
    }
    })
}


function editardadosusuario () { // Função para editar os dados do usuário, permitindo que o usuário escolha qual dado ele quer editar, e salvando as alterações no arquivo JSON.
   
    console.log("\n1 - Editar os dados de um usuário cadastrado."); 
    console.log("2 - Retornar ao menu de opções."); 

    rl.question("\nDigite a opção desejada: ", (opcao) => {

    switch (opcao) { 

        case"1": rl.question("\nDigite a numeração do usuário que deseja editar os dados: ", (usuariodigitado) => {
            
            if (usuarioincorreto(usuariodigitado)) { // Se a função de verificar um usuário incorreto for true, o programa é encerrado.
                editardadosusuario(); // Depois de mostrar a mensagem de que o usuário é incorreto, mostra a função de editar os dados do usuário novamente, para o usuário escolher outro usuário para editar ou voltar para o menu de opções.
                return; 
            } 

            console.log("\n1 - Nome Completo"); // O número "1" corresponde a "Nome Completo"
            console.log("2 - E-mail"); // O número "2" corresponde a "E-mail"
            console.log("3 - CPF"); // O número "3" corresponde a "CPF"
            console.log("4 - CEP"); // O número "4" corresponde a "CEP"

            rl.question("\nDigite a numeração do dado que deseja editar: ", (dado) => {

                if (dadoincorreto(dado)) { // Se a função de verificar o dado incorreto for true, o programa é encerrado.
                    editardadosusuario(); // Depois de mostrar a mensagem de que o dado é incorreto, mostra a função de editar os dados do usuário novamente, para o usuário escolher outro usuário para editar ou voltar para o menu de opções.
                    return;
                }

            const campoescolhido = validarcampodadousuario(dado); // Chama a função de validar o campo do dado do usuário que ele deseja editar, para verificar se o número digitado corresponde a um campo existente, e se o campo digitado é válido para ser editado.
            rl.question(`\nDigite a nova informação para substituir o campo "${campoescolhido}" do usuário ${usuariodigitado}: `, async (novodado) => { 
             
            if(dado === "1") { // Se o dado escolhido for o nome completo, tem que validar o novo dado com a função de verificar "nomeincorreto", para verificar se o novo dado digitado para substituir o nome completo é válido.
                if(nomeincorreto(novodado)) { // Se a função de verificar um nome incorreto for true, o programa é encerrado
                    editardadosusuario(); // Depois de mostrar a mensagem de que o nome é incorreto, mostra a função de editar os dados do usuário novamente.
                    return; 
                }
                substituiresalvardado(usuariodigitado, campoescolhido, novodado) // Chama a função de substituir o dado do usuário, para substituir o dado antigo pelo novo dado fornecido pelo usuário. 
               
                console.log(`\n${campoescolhido} do usuário ${usuariodigitado} editado com sucesso!`); 
                editardadosusuario(); // Depois de editar o dado do usuário, mostra a mensagem de que o dado foi editado com sucesso. 
                return;
             } 

             if (dado === "2") { // Se o dado escolhido for o e-mail, tem que validar o novo dado com a função de verificar "emailincorreto", para verificar se o novo dado digitado para substituir o e-mail é válido.
                if(emailincorreto(novodado) || emailrepetido(novodado)) { // Se a função de verificar um e-mail incorreto for true, OU se a função de verificar um e-mail repetido for true, o programa é encerrado.
                    editardadosusuario(); // Depois de mostrar a mensagem de que o e-mail é incorreto ou que o e-mail já existe, mostra a função de editar os dados do usuário novamente. 
                    return; 
                } 
                substituiresalvardado(usuariodigitado, campoescolhido, novodado) // Chama a função de substituir o dado do usuário, para substituir o dado antigo pelo novo dado fornecido pelo usuário.

                console.log(`\n${campoescolhido} do usuário ${usuariodigitado} editado com sucesso!`); 
                editardadosusuario(); // Depois de editar o dado do usuário, mostra a mensagem de que o dado foi editado com sucesso.
                return; 
            }      

            if (dado === "3") { // Se o dado escolhido for o CPF, tem que validar o novo dado com a função de verificar "cpfincorreto", para verificar se o novo dado digitado para substituir o CPF é válido.
                if (cpfincorreto(novodado)) { // Se a função de verificar um CPF incorreto for true, o programa é encerrado.
                editardadosusuario(); // Depois de mostrar a mensagem de que o CPF é incorreto, mostra a função de editar os dados do usuário novamente. 
                return;
            } 
                substituiresalvardado(usuariodigitado, campoescolhido, novodado) // Chama a função de substituir o dado do usuário, para substituir o dado antigo pelo novo dado fornecido pelo usuário.

                console.log(`\n${campoescolhido} do usuário ${usuariodigitado} editado com sucesso!`); 
                editardadosusuario(); // Depois de editar o dado do usuário, mostra a mensagem de que o dado foi editado com sucesso.
                return; 
    } 

             if (dado === "4") { // Se o dado escolhido for o CEP, tem que validar o novo dado com a função de verificar "cepincorreto", para verificar se o novo dado digitado para substituir o CEP é válido. 
                if (cepincorreto(novodado)) { // Se a função de verificar um CEP incorreto for true, o programa é encerrado.
                editardadosusuario(); // Depois de mostrar a mensagem de que o CEP é incorreto, mostra a função de editar os dados do usuário novamente.              
                return;
            }

             const dadoscep = await buscarcep(novodado) // Se o dado escolhido for o CEP, tem que buscar os dados de endereço do novo CEP fornecido pelo usuário com a função "buscarcep".
             if(!dadoscep) { // Se a função de buscar o CEP na API ViaCEP retornar um erro, mostra a mensagem de que o CEP não foi encontrado.
                console.log("CEP não encontrado."); 
                editardadosusuario(); // Depois de mostrar a mensagem de que o CEP não foi encontrado, mostra a função de editar os dados do usuário novamente.
                return;
            } 
            
            atualizarendereco(usuariodigitado, novodado, dadoscep) // Chama a função "atualizarendereco", que atualiza o CEP, e, consequentemente a Rua, Bairro, Cidade e Estado.

            console.log(`\n${campoescolhido} do usuário ${usuariodigitado} editado com sucesso!`); 
            editardadosusuario(); // Depois de editar o dado do usuário, mostra a mensagem de que o dado foi editado com sucesso.   

    }     
        }) 
            }) 
        }) 
             break;
        
             case "2":   
        menulooping(); // Chama a função de mostrar o menu de opções, para o usuário escolher outra opção ou sair do programa.
             break;

        default: console.log("\nComando Inválido.") // Se o usuário digitar uma opção que não existe, mostra a mensagem de comando inválido.
        editardadosusuario(); 
            
    }     
        })     
} 
    

function menulooping () { // Função para mostrar o menu de opções para o usuário, e permitir que ele escolha o que quer fazer. 

    console.log("\n1 - Cadastrar Usuário"); // O número "1" corresponde a "Cadastrar Usuários"
    console.log("2 - Listar Usuários"); // O número "2" corresponde a "Listar Usuários"
    console.log("3 - Sair"); // O número "3" corresponde a "Sair"
    console.log("4 - Editar os dados de um Usuário"); // O número "4" corresponde a "Editar os dados de um Usuário"
    console.log("5 - Excluir um Usuário"); // O número "5" corresponde a "Excluir um Usuário"

    rl.question ("\nDigite a opção desejada: ", (opcao) => {  

       switch (opcao) { 

          case "1": cadastrodeusuarios(); // Chama a função de cadastro de usuários, para o usuário fornecer os dados e cadastrar um novo usuário.
             break;
          
          case "2": if(listarusuarios()) { // Chama a função de "listarusuários", para mostrar e listar os usuários cadastrados. 
                        menudetalhesusuarios() // Depois chama a funçaõ de "menudetalhesusuarios" para mostrar o menu de detalhes e o usuário escolher se quer ver mais detalhes de algum usuário específico.
                        menulooping();
                    }
                    break; 
          
          case "3": console.log ("\nSaindo..."); 
          rl.close(); // Encerra a interface de leitura, para o programa ser encerrado de fato, e não ficar esperando o usuário digitar algo.
             break;

          case "4": if(listarusuarios()) { // Chama a função de "listarusuários", para depois ele selecionar qual usuario quer editar o dado ou se quer retornar ao menu.
                        editardadosusuario() 
                    }  else {
                        menulooping();
                    }
                    break;
            
          case "5": if(listarusuarios()) { // Chama a função de "listarusuários", para depois ele selecionar qual usuario quer editar o dado ou se quer retornar ao menu.
                        deletarusuario() // Chama a função de "deletarusuario", para o usuário escolher qual usuário quer excluir, e depois confirmar a exclusão, e em seguida voltar para o menu de opções.
                    } else {
                        menulooping();
                    }
             break;

          default: console.log("\nComando Inválido.") 
          menulooping();
       } 
    
}) 
} 


function menudetalhesusuarios() { // Função para mostrar o menu de detalhes dos usuários, para o usuário escolher se quer ver mais detalhes de algum usuário específico.

   console.log("\n1 - Visualizar mais detalhes dos usuarios."); 
   console.log("2 - Retornar ao menu de opções.");

rl.question ("\nDigite a opção desejada: ", (opcao) => { 

    switch(opcao) {

        case "1": rl.question("\nDigite a numeração do usuário que deseja visualizar mais detalhes: ", (numerodigitado) => { 
             detalhesusuarios(numerodigitado); // Transferi o número que o usuário digitou e envia esse valor para a função "detalhesusuarios" tratar toda a lógica. 
             return menudetalhesusuarios(); //  Volta para o menu de detalhes e mostra as opções de novo.
             
        });  
        break;

        case"2":
        menulooping(); // Chama a função de mostrar o menu de opções, para o usuário escolher outra opção ou sair do programa.
        break;

        default: console.log("\nComando Inválido.") 
        menudetalhesusuarios(); // Depois de mostrar a mensagem de comando inválido, mostra o menu de detalhes dos usuários novamente.

     } 
} 
   ) 
} 


function cadastrodeusuarios() { // Função para cadastrar um novo usuário.

    rl.question ("\nDigite seu Nome Completo: ", (nomecompleto) => {

    if (nomeincorreto(nomecompleto)) { // Se a função "nomeincoreto" for true, o programa é encerrado.
        menulooping(); // Chama a função "menulooping" para mostrar o menu de opções e o usuário escolher outra opção ou sair do programa.
        return;
    } 

rl.question ("Digite seu E-mail: ", (email) => { 
    
    if (emailincorreto(email)) { // Se a função "emailincorreto" for true, o programa é encerrado. 
        menulooping(); // Chama a função "menulooping" para mostrar o menu de opções e o usuário escolher outra opção ou sair do programa.
        return;
    } 

    if (emailrepetido(email)) { // Se a função "emailrepetido" for true, o programa é encerrado.
        menulooping(); // Chama a função "menulooping" para mostrar o menu de opções e o usuário escolher outra opção ou sair do programa.
        return;
    } 

rl.question ("Digite seu CPF: ", (CPF) => { 

    if (cpfincorreto(CPF)) { // Se a função "cpfincorreto"  for true, o programa é encerrado.
        menulooping(); // Chama a função "menulooping" para mostrar o menu de opções e o usuário escolher outra opção ou sair do programa.
        return;
    } 

rl.question ("Digite seu CEP: ", (CEP) => {

    if (cepincorreto(CEP))  { // Se a função "cepincorreto" for true, o programa é encerrado.
        menulooping(); // Chama a função "menulooping" para mostrar o menu de opções e o usuário escolher outra opção ou sair do programa.
        return;
    } 

     let usuario = { // Cria um objeto usuario com os dados fornecidos.
        "Nome Completo": nomecompleto, // Atribui o valor de nomecompleto à propriedade "Nome Completo"
        "E_mail": email, // Atribui o valor de email à propriedade "E_mail"
        "CPF": CPF, // Atribui o valor de CPF à propriedade "CPF"
        "CEP": CEP, // Atribui o valor de CEP à propriedade "CEP"
        "Rua": "", // Atribui o valor de Rua à propriedade " "
        "Bairro": "", // Atribui o valor de Bairro à propriedade " "
        "Cidade": "", // Atribui o valor de Cidade à propriedade " "
        "Estado": "" // Atribui o valor de Estado à propriedade " "
        
            }; 

console.log("\nObrigado por fornecer suas informações! Aguarde um momento, estamos verificando no nosso Banco de Dados..."); 

    buscarcep(CEP) // Chama a função "buscarcep" para buscar o CEP na API ViaCEP e pegar os dados de endereço do usuário.
    .then((dados) => { // Trata a resposta da função "buscarcep" e espera a resposta da API ViaCEP, para pegar os dados de endereço do usuário.

        if (dados.erro) { // Verifica se a resposta da API ViaCEP tem a propriedade "erro", que indica que o CEP é inválido.
            console.log("\nCEP não encontrado."); 
            menulooping(); // Depois de mostrar a mensagem de que o CEP não foi encontrado, mostra o menu de opções novamente, para o usuário escolher uma opção válida ou sair do programa.
            return;
        } 

        usuario.Rua = dados.logradouro; // Atribuo a minha identificação de Rua igual ao da API ViaCEP, que se chama de "logradouro"
        usuario.Bairro = dados.bairro;  // Atribuo a minha identificação de Bairro igual ao da API ViaCEP, que se chama de "bairro"
        usuario.Cidade = dados.localidade;  // Atribuo a minha identificação de Cidade igual ao da API ViaCEP, que se chama de "localidade"
        usuario.Estado = dados.uf;  // Atribuo a minha identificação de Estado igual ao da API ViaCEP, que se chama de "uf"

        salvarusuario(usuario); // Chama a função "salvarusuario" para salvar o novo usuário no arquivo JSON.
        menulooping() // Depois de salvar o usuário no arquivo JSON, mostra o menu de opções novamente, para o usuário escolher outra opção ou sair do programa.
    }) 

    .catch((erro) => { // Trata/Resolve erros de falhas de internet/API fora do ar. O "erro" dentro, mostra o erro real que acontece, o verdadeiro diagnostico.
        console.log("\nErro ao consultar o CEP.", erro); 
        menulooping(); // Depois de mostrar a mensagem de erro ao consultar o CEP, mostra o menu de opções novamente, para o usuário escolher outra opção ou sair do programa.
    }); 

}); 
}); 
}); 
}); 
} 

menulooping(); // Chama a função de mostrar o menu de opções novamente, após efetuar alguma etapa do menu de opções.