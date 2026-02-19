// Arquivo de interação com o usuário, perguntas...
const readline = require ("readline"); // Importa o módulo readline para ler entrada do usuário
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

       const rl = readline.createInterface ({ // Cria uma interface de leitura
    input: process.stdin, // Define a entrada padrão como o teclado
    output: process.stdout // Define a saída padrão como o console
})


function deletarusuario () { // Função que permiti deletar um usuário   
    
    // Exibe as opções iniciais do menu de exclusão
    console.log("\n1 - Excluir permanentemente um usuário cadastrado.");
    console.log("2 - Retornar ao menu de opções.");

    rl.question("\nDigite a opção desejada: ", (opcao) => {

    switch (opcao) {

        case"1": rl.question("\nDigite a numeração do usuario que deseja excluir: ", (usuariodigitado) => {
            
            if (buscarexcluirusuario(usuariodigitado)) {  // Verifica se o usuário informado existe no banco. 
                deletarusuario(); // Caso não exista o usuário no banco, reinicia o fluxo e volta para as opções iniciais da função.
                return;
            }

        // Exibe confirmação antes de excluir definitivamente
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


function editardadosusuario () { // Função para editar os dados do usuário, permitindo que o usuário escolha qual dado ele quer editar, e salvando as alterações no arquivo JSON
   
    console.log("\n1 - Editar os dados de um usuário cadastrado."); 
    console.log("2 - Retornar ao menu de opções."); 

    rl.question("\nDigite a opção desejada: ", (opcao) => {

    switch (opcao) { 

        case"1": rl.question("\nDigite a numeração do usuário que deseja editar os dados: ", (usuariodigitado) => {
            
            if (usuarioincorreto(usuariodigitado)) { // Se a função de verificar um usuário incorreto for true, o programa é encerrado 
                editardadosusuario(); // Depois de mostrar a mensagem de que o usuário é incorreto, mostra a função de editar os dados do usuário novamente, para o usuário escolher outro usuário para editar ou voltar para o menu de opções
                return; } 
                // Fecha a verificação de que o usuário é incorreto, ou seja, se a função de verificar um usuário incorreto for true, o programa é encerrado, e depois mostra a função de editar os dados do usuário novamente, para o usuário escolher outro usuário para editar ou voltar para o menu de opções

            console.log("\n1 - Nome Completo"); // O número "1" corresponde a "Nome Completo"
            console.log("2 - E-mail"); // O número "2" corresponde a "E-mail"
            console.log("3 - CPF"); // O número "3" corresponde a "CPF"
            console.log("4 - CEP"); // O número "4" corresponde a "CEP"

            rl.question("\nDigite a numeração do dado que deseja editar: ", (dado) => {

                if (dadoincorreto(dado)) {
                    editardadosusuario();
                    return;
                } // Fecha a verificação de que o dado escolhido para editar é incorreto, ou seja, se a função de verificar um dado incorreto for true, o programa é encerrado, e depois mostra a função de editar os dados do usuário novamente, para o usuário escolher outro dado para editar ou voltar para o menu de opções

            const campoescolhido = validarcampodadousuario(dado); // Chama a função de validar o campo do dado do usuário que ele deseja editar, para verificar se o número digitado corresponde a um campo existente, e se o campo digitado é válido para ser editado. Exemplo: se digitar 1, tem que ser o "Nome Completo", se digitar 2, tem que ser o "E-mail", e assim por diante. E depois, tem que validar se o dado digitado para substituir aquele campo é válido, ou seja, se for o nome completo, tem que validar com a função nomeincorreto, se for email, tem que validar com a função emailincorreto, e assim por diante. O "campoescolhido" é o valor do campo escolhido pelo usuário para editar, e é usado como parâmetro para a função "editardado", para saber qual campo do usuário deve ser editado com o novo dado fornecido pelo usuário.
            rl.question(`\nDigite a nova informação para substituir o campo "${campoescolhido}" do usuário ${usuariodigitado}: `, async (novodado) => {
             
            if(dado === "1") { // Se o dado escolhido for o nome completo, tem que validar o novo dado com a função de verificar "nomeincorreto", para verificar se o novo dado digitado para substituir o nome completo é válido, ou seja, se não está vazio, ou se não tem números, ou se não tem caracteres especiais, e assim por diante. O "dado" é o número do campo escolhido pelo usuário para editar, e é usado para comparar com as opções de campos existentes, para saber qual campo do usuário deve ser editado com o novo dado fornecido pelo usuário. O "novodado" é o novo dado fornecido pelo usuário para substituir o dado antigo do campo escolhido, e é usado como parâmetro para a função de verificar um nome incorreto, para validar se o novo dado digitado para substituir o nome completo é válido, ou seja, se não está vazio, ou se não tem números, ou se não tem caracteres especiais, e assim por diante.
                if(nomeincorreto(novodado)) { // Se a função de verificar um nome incorreto for true, o programa é encerrado
                    editardadosusuario(); // Depois de mostrar a mensagem de que o nome é incorreto, mostra a função de editar os dados do usuário novamente, para o usuário escolher outro dado para editar ou voltar para o menu de opções
                    return; 
                } // Fecha a verificação de que o nome é incorreto, ou seja, se a função de verificar um nome incorreto for true, o programa é encerrado, e depois mostra a função de editar os dados do usuário novamente, para o usuário escolher outro dado para editar ou voltar para o menu de opções
                substituiresalvardado(usuariodigitado, campoescolhido, novodado) // Chama a função de substituir o dado do usuário, para substituir o dado antigo pelo novo dado fornecido pelo usuário, e depois salvar as alterações no arquivo JSON, e depois voltar para o menu de opções. O "substituirdado" é a função que faz a substituição do dado antigo pelo novo dado fornecido pelo usuário, e salva as alterações no arquivo JSON, e depois volta para o menu de opções. O "usuariodigitado" é o número do usuário que o usuário digitou para escolher qual usuário ele quer editar os dados, e é usado como parâmetro para a função "substituirdado", para saber qual usuário deve ter os dados editados. O "campoescolhido" é o campo escolhido pelo usuário para editar, e é usado como parâmetro para a função "substituirdado", para saber qual campo do usuário deve ser editado com o novo dado fornecido pelo usuário. O "novodado" é o novo dado fornecido pelo usuário para substituir o dado antigo do campo escolhido, e é usado como parâmetro para a função "substituirdado", para substituir o dado antigo pelo novo dado fornecido pelo usuário.
               
                console.log(`\n${campoescolhido} do usuário ${usuariodigitado} editado com sucesso!`); 
                editardadosusuario(); // Depois de editar o dado do usuário, mostra a mensagem de que o dado foi editado com sucesso, e depois volta para a função de editar os dados do usuário, para o usuário escolher outro dado para editar ou voltar para o menu de opções
                return;
             } // Fecha a verificação de que o nome é incorreto, ou seja, se a função de verificar um nome incorreto for true, o programa é encerrado, e depois mostra a função de editar os dados do usuário novamente, para o usuário escolher outro dado para editar ou voltar para o menu de opções

             if (dado === "2") { // Se o dado escolhido for o e-mail, tem que validar o novo dado com a função de verificar "emailincorreto", para verificar se o novo dado digitado para substituir o e-mail é válido, ou seja, se não está vazio, ou se tem um formato de e-mail válido, e assim por diante. E também tem que validar com a função de verificar "emailrepetido", para verificar se o novo dado digitado para substituir o e-mail já existe no arquivo JSON, ou seja, se já tem um usuário com aquele e-mail cadastrado, para evitar que tenha dois usuários com o mesmo e-mail. O "dado" é o número do campo escolhido pelo usuário para editar, e é usado para comparar com as opções de campos existentes, para saber qual campo do usuário deve ser editado com o novo dado fornecido pelo usuário. O "novodado" é o novo dado fornecido pelo usuário para substituir o dado antigo do campo escolhido, e é usado como parâmetro para as funções de verificar um e-mail incorreto e um e-mail repetido, para validar se o novo dado digitado para substituir o e-mail é válido, ou seja, se não está vazio, ou se tem um formato de e-mail válido, e assim por diante, e também para verificar se já tem um usuário com aquele e-mail cadastrado no arquivo JSON.
                if(emailincorreto(novodado) || emailrepetido(novodado)) { // Se a função de verificar um e-mail incorreto for true, OU se a função de verificar um e-mail repetido for true, o programa é encerrado
                    editardadosusuario(); // Depois de mostrar a mensagem de que o e-mail é incorreto ou que o e-mail já existe, mostra a função de editar os dados do usuário novamente, para o usuário escolher outro dado para editar ou voltar para o menu de opções
                    return; 
                } // Fecha a verificação de que o e-mail é incorreto ou que o e-mail já existe, ou seja, se a função de verificar um e-mail incorreto for true, OU se a função de verificar um e-mail repetido for true, o programa é encerrado, e depois mostra a função de editar os dados do usuário novamente, para o usuário escolher outro dado para editar ou voltar para o menu de opções
                substituiresalvardado(usuariodigitado, campoescolhido, novodado) // Chama a função de substituir o dado do usuário, para substituir o dado antigo pelo novo dado fornecido pelo usuário, e depois salvar as alterações no arquivo JSON, e depois voltar para o menu de opções. O "substituirdado" é a função que faz a substituição do dado antigo pelo novo dado fornecido pelo usuário, e salva as alterações no arquivo JSON, e depois volta para o menu de opções. O "usuariodigitado" é o número do usuário que o usuário digitou para escolher qual usuário ele quer editar os dados, e é usado como parâmetro para a função "substituirdado", para saber qual usuário deve ter os dados editados. O "campoescolhido" é o campo escolhido pelo usuário para editar, e é usado como parâmetro para a função "substituirdado", para saber qual campo do usuário deve ser editado com o novo dado fornecido pelo usuário. O "novodado" é o novo dado fornecido pelo usuário para substituir o dado antigo do campo escolhido, e é usado como parâmetro para a função "substituirdado", para substituir o dado antigo pelo novo dado fornecido pelo usuário.

                console.log(`\n${campoescolhido} do usuário ${usuariodigitado} editado com sucesso!`); 
                editardadosusuario(); // Depois de editar o dado do usuário, mostra a mensagem de que o dado foi editado com sucesso, e depois volta para a função de editar os dados do usuário, para o usuário escolher outro dado para editar ou voltar para o menu de opções
                return; 
            } // Fecha a verificação de que o e-mail é incorreto ou que o e-mail já existe, ou seja, se a função de verificar um e-mail incorreto for true, OU se a função de verificar um e-mail repetido for true, o programa é encerrado, e depois mostra a função de editar os dados do usuário novamente, para o usuário escolher outro dado para editar ou voltar para o menu de opções       

            if (dado === "3") { // Se o dado escolhido for o CPF, tem que validar o novo dado com a função de verificar "cpfincorreto", para verificar se o novo dado digitado para substituir o CPF é válido, ou seja, se não está vazio, ou se tem um formato de CPF válido, e assim por diante. O "dado" é o número do campo escolhido pelo usuário para editar, e é usado para comparar com as opções de campos existentes, para saber qual campo do usuário deve ser editado com o novo dado fornecido pelo usuário. O "novodado" é o novo dado fornecido pelo usuário para substituir o dado antigo do campo escolhido, e é usado como parâmetro para a função de verificar um CPF incorreto, para validar se o novo dado digitado para substituir o CPF é válido, ou seja, se não está vazio, ou se tem um formato de CPF válido, e assim por diante.
                if (cpfincorreto(novodado)) { // Se a função de verificar um CPF incorreto for true, o programa é encerrado
                editardadosusuario(); // Depois de mostrar a mensagem de que o CPF é incorreto, mostra a função de editar os dados do usuário novamente, para o usuário escolher outro dado para editar ou voltar para o menu de opções
                return;
            } // Fecha a verificação de que o CPF é incorreto, ou seja, se a função de verificar um CPF incorreto for true, o programa é encerrado, e depois mostra a função de editar os dados do usuário novamente, para o usuário escolher outro dado para editar ou voltar para o menu de opções
                substituiresalvardado(usuariodigitado, campoescolhido, novodado) // Chama a função de substituir o dado do usuário, para substituir o dado antigo pelo novo dado fornecido pelo usuário, e depois salvar as alterações no arquivo JSON, e depois voltar para o menu de opções. O "substituirdado" é a função que faz a substituição do dado antigo pelo novo dado fornecido pelo usuário, e salva as alterações no arquivo JSON, e depois volta para o menu de opções. O "usuariodigitado" é o número do usuário que o usuário digitou para escolher qual usuário ele quer editar os dados, e é usado como parâmetro para a função "substituirdado", para saber qual usuário deve ter os dados editados. O "campoescolhido" é o campo escolhido pelo usuário para editar, e é usado como parâmetro para a função "substituirdado", para saber qual campo do usuário deve ser editado com o novo dado fornecido pelo usuário. O "novodado" é o novo dado fornecido pelo usuário para substituir o dado antigo do campo escolhido, e é usado como parâmetro para a função "substituirdado", para substituir o dado antigo pelo novo dado fornecido pelo usuário.

                console.log(`\n${campoescolhido} do usuário ${usuariodigitado} editado com sucesso!`); 
                editardadosusuario(); // Depois de editar o dado do usuário, mostra a mensagem de que o dado foi editado com sucesso, e depois volta para a função de editar os dados do usuário, para o usuário escolher outro dado para editar ou voltar para o menu de opções
                return; 
    } // Fecha a verificação de que o CPF é incorreto, ou seja, se a função de verificar um CPF incorreto for true, o programa é encerrado, e depois mostra a função de editar os dados do usuário novamente, para o usuário escolher outro dado para editar ou voltar para o menu de opções

             if (dado === "4") { // Se o dado escolhido for o CEP, tem que validar o novo dado com a função de verificar "cepincorreto", para verificar se o novo dado digitado para substituir o CEP é válido, ou seja, se não está vazio, ou se tem um formato de CEP válido, e assim por diante. 
                if (cepincorreto(novodado)) { // Se a função de verificar um CEP incorreto for true, o programa é encerrado
                editardadosusuario(); // Depois de mostrar a mensagem de que o CEP é incorreto, mostra a função de editar os dados do usuário novamente, para o usuário escolher outro dado para editar ou voltar para o menu de opções              
                return;
            } // Fecha a verificação de que o CEP é incorreto, ou seja, se a função de verificar um CEP incorreto for true, o programa é encerrado, e depois mostra a função de editar os dados do usuário novamente, para o usuário escolher outro dado para editar ou voltar para o menu de opções

             const dadoscep = await buscarcep(novodado) // Se o dado escolhido for o CEP, tem que buscar os dados de endereço do novo CEP fornecido pelo usuário, para atualizar os dados de endereço do usuário, e depois salvar as alterações no arquivo JSON, e depois voltar para o menu de opções. O "dadoscep" é o valor retornado pela função "buscarcep", que são os dados de endereço do novo CEP fornecido pelo usuário, ou um erro se o CEP for inválido ou se houver algum problema com a requisição. O "buscarcep" é a função que faz a requisição para a API ViaCEP, e retorna os dados de endereço do novo CEP fornecido pelo usuário, ou um erro se o CEP for inválido ou se houver algum problema com a requisição. O "novodado" é o novo CEP fornecido pelo usuário para substituir o dado antigo do campo CEP, e é usado como parâmetro para a função "buscarcep", para fazer a requisição para a API ViaCEP com o novo CEP fornecido pelo usuário.
             if(!dadoscep) { // Se a função de buscar o CEP na API ViaCEP retornar um erro, ou seja, se o "dadoscep" for falso, mostra a mensagem de que o CEP não foi encontrado, e volta para o menu de opções, para o usuário digitar um CEP válido ou escolher outra opção. O "dadoscep" é o valor retornado pela função "buscarcep", que são os dados de endereço do novo CEP fornecido pelo usuário, ou um erro se o CEP for inválido ou se houver algum problema com a requisição. O "buscarcep" é a função que faz a requisição para a API ViaCEP, e retorna os dados de endereço do novo CEP fornecido pelo usuário, ou um erro se o CEP for inválido ou se houver algum problema com a requisição. O "novodado" é o novo CEP fornecido pelo usuário para substituir o dado antigo do campo CEP, e é usado como parâmetro para a função "buscarcep", para fazer a requisição para a API ViaCEP com o novo CEP fornecido pelo usuário.
                console.log("CEP não encontrado."); 
                editardadosusuario(); // Depois de mostrar a mensagem de que o CEP não foi encontrado, mostra a função de editar os dados do usuário novamente, para o usuário escolher outro dado para editar ou voltar para o menu de opções
                return;
            } // Fecha a verificação de que o CEP não foi encontrado, ou seja, se a função de buscar o CEP na API ViaCEP retornar um erro, ou seja, se o "dadoscep" for falso, mostra a mensagem de que o CEP não foi encontrado, e volta para o menu de opções, para o usuário digitar um CEP válido ou escolher outra opção
            
            atualizarendereco(usuariodigitado, novodado, dadoscep) // Atualiza o CEP, e, consequentemente A Rua, Bairro, Cidade e Estado, a partir da busca do CEP.

            console.log(`\n${campoescolhido} do usuário ${usuariodigitado} editado com sucesso!`); 
            editardadosusuario(); // Depois de editar o dado do usuário, mostra a mensagem de que o dado foi editado com sucesso, e depois volta para a função de editar os dados do usuário, para o usuário escolher outro dado para editar ou voltar para o menu de opções            return;

    } // Fecha o switch do dado escolhido para editar, para o usuário escolher qual dado quer editar, e depois fornecer o novo dado para substituir o dado antigo do campo escolhido do usuário selecionado, e depois salvar as alterações no arquivo JSON, e depois voltar para o menu de opções    
        }) // Fecha a pergunta de selecionar a numeração do dado que deseja editar, e a pergunta de digitar a nova informação para substituir o campo escolhido do usuário selecionado, para o usuário escolher qual dado quer editar, e fornecer o novo dado para substituir o dado antigo do campo escolhido do usuário selecionado, e depois salvar as alterações no arquivo JSON, e depois voltar para o menu de opções
            }) // Fecha a pergunta de digitar a nova informação para substituir o campo escolhido do usuário selecionado, para o usuário fornecer o novo dado para substituir o dado antigo do campo escolhido do usuário selecionado, e depois salvar as alterações no arquivo JSON, e depois voltar para o menu de opções
        }) // Fecha a pergunta de selecionar a numeração do usuário que deseja editar os dados, e a pergunta de selecionar a numeração do dado que deseja editar, e a pergunta de digitar a nova informação para substituir o campo escolhido do usuário selecionado, para o usuário escolher qual usuário quer editar, qual dado quer editar, e fornecer o novo dado para substituir o dado antigo do campo escolhido do usuário selecionado, e depois salvar as alterações no arquivo JSON, e depois voltar para o menu de opções
             break;
        
             case "2":   
        menulooping(); // Chama a função de mostrar o menu de opções, para o usuário escolher outra opção ou sair do programa
             break;

        default: console.log("\nComando Inválido.") // Se o usuário digitar uma opção que não existe, mostra essa mensagem de comando inválido
        editardadosusuario(); 
            
    } // Fecha o switch da pergunta de escolher a opção de editar os dados do usuário, para o usuário escolher se quer editar os dados de um usuário cadastrado ou se quer retornar ao menu de opções
            
        }) // Fecha a pergunta de escolher a opção de editar os dados do usuário, para o usuário escolher se quer editar os dados de um usuário cadastrado ou se quer retornar ao menu de opções
         
} // Fecha a função de editar os dados do usuário, permitindo que o usuário escolha qual dado ele quer editar, e salvando as alterações no arquivo JSON
    

function menulooping () { // Função para mostrar o menu de opções para o usuário, e permitir que ele escolha o que quer fazer, e depois voltar para o menu de opções, para escolher outra opção ou sair do programa. O "looping" é para mostrar o menu de opções novamente, depois que o usuário escolher uma opção, para ele poder escolher outra opção ou sair do programa.

// Inserção das opções do menu, para o usuario decidir o que quer fazer com base no digito.
    console.log("\n1 - Cadastrar Usuário"); // O número "1" corresponde a "Cadastrar Usuários"
    console.log("2 - Listar Usuários"); // O número "2" corresponde a "Listar Usuários"
    console.log("3 - Sair"); // O número "3" corresponde a "Sair"
    console.log("4 - Editar os dados de um Usuário"); // O número "4" corresponde a "Editar os dados de um Usuário"
    console.log("5 - Excluir um Usuário"); // O número "5" corresponde a "Excluir um Usuário"

    rl.question ("\nDigite a opção desejada: ", (opcao) => { // Faz a pergunta para o usuário, e espera a resposta. O "opcao" é o que o usuário digitou, e é usado para comparar com as opções do menu, para saber qual opção o usuário escolheu. O "question" é para fazer a pergunta, e o "callback" é para esperar a resposta do usuário, e depois executar a função que está dentro do callback, que é onde tem a lógica para cada opção escolhida pelo usuário.

       switch (opcao) { 

          case "1": cadastrodeusuarios(); // Chama a função de cadastro de usuários, para o usuário fornecer os dados e cadastrar um novo usuário, e depois voltar para o menu de opções
             break;
          
          case "2": if(listarusuarios()) { // Chama a função de listar os usuários, para mostrar os usuários cadastrados, e depois mostrar o menu de detalhes, para o usuário escolher se quer ver mais detalhes de algum usuário ou voltar para o menu de opções
                        menudetalhesusuarios()
                    } else {
                        menulooping();
                    }
                    break; 
          
          case "3": console.log ("\nSaindo..."); 
          rl.close(); // Encerra a interface de leitura, para o programa ser encerrado de fato, e não ficar esperando o usuário digitar algo
             break;

          case "4": if(listarusuarios()) { // Mostra a lsita dos usuarios, apra depois ele selecionar qual usuario quer editar o dado ou se quer retornar ao menu
                        editardadosusuario() // Chama a função de alterar os dados do usuário, para o usuário escolher qual usuário quer editar, e depois escolher qual dado quer editar, e depois fornecer o novo dado, e depois voltar para o menu de opções
                    }  else {
                        menulooping();
                    }
                    break;
            
          case "5": if(listarusuarios()) {
                        deletarusuario() // Chama a função de excluir um usuário, para o usuário escolher qual usuário quer excluir, e depois confirmar a exclusão, e depois voltar para o menu de opções
                    } else {
                        menulooping();
                    }
             break;

          default: console.log("\nComando Inválido.") 
          menulooping();
       } // Fecha o switch do menu de opções, para o usuário escolher o que quer fazer, e depois voltar para o menu de opções, para escolher outra opção ou sair do programa
    
}) // Fecha a pergunta do menu de opções, para o usuário escolher o que quer fazer, e depois voltar para o menu de opções, para escolher outra opção ou sair do programa
} // Fecha a função de mostrar o menu de opções para o usuário, e permitir que ele escolha o que quer fazer, e depois voltar para o menu de opções, para escolher outra opção ou sair do programa


function menudetalhesusuarios() { // Função para mostrar o menu de detalhes dos usuários, para o usuário escolher se quer ver mais detalhes de algum usuário ou voltar para o menu de opções, e depois voltar para o menu de opções

   console.log("\n1 - Visualizar mais detalhes dos usuarios."); 
   console.log("2 - Retornar ao menu de opções.");

rl.question ("\nDigite a opção desejada: ", (opcao) => { 

    switch(opcao) {

        case "1": rl.question("\nDigite a numeração do usuário que deseja visualizar mais detalhes: ", (numerodigitado) => { 
             detalhesusuarios(numerodigitado); // Transferi o número que o usuário digitou e envia esse valor para a função "detalhesusuarios" tratar toda a lógica. Chama a função com parámetro
             return menudetalhesusuarios(); //  Volta para o menu de detalhes e mostra as opções de novo
             
        }); // Fecha a pergunta de selecionar a numeração do usuário que deseja visualizar mais detalhes 
        break;

        case"2":
        menulooping(); // Chama a função de mostrar o menu de opções, para o usuário escolher outra opção ou sair do programa
        break;

        default: console.log("\nComando Inválido.") 
        menudetalhesusuarios(); // Depois de mostrar a mensagem de comando inválido, mostra o menu de detalhes dos usuários novamente, para o usuário escolher uma opção válida ou voltar para o menu de opções

     } // Fecha o switch do menu de detalhes dos usuários

} // Fecha a pergunta do menu de detalhes dos usuários
   ) // Fecha a pergunta do menu de detalhes dos usuários
} // Fecha a função de menu de detalhes dos usuários


function cadastrodeusuarios() { // Função para cadastrar um novo usuário, fazendo as perguntas para o usuário fornecer os dados, e depois salvar o usuário no arquivo JSON, e depois voltar para o menu de opções
rl.question ("\nDigite seu Nome Completo: ", (nomecompleto) => {

    if (nomeincorreto(nomecompleto)) { // Se a função for true, o programa é encerrado 
        menulooping(); // Chama a função de mostrar o menu de opções, para o usuário escolher outra opção ou sair do programa
        return;
    } // Fecha a verificação de nome preenchido em branco, ou com formato inválido

rl.question ("Digite seu E-mail: ", (email) => { 
    
    if (emailincorreto(email)) { // Se a função de verificar o email preenchido em branco for true, o programa é encerrado 
        menulooping(); // Chama a função de mostrar o menu de opções, para o usuário escolher outra opção ou sair do programa
        return;
    } // Fecha a verificação de email preenchido em branco, ou com formato inválido

    if (emailrepetido(email)) { // Se a função de verificar um email repetido for true, o programa é encerrado 
        menulooping(); // Chama a função de mostrar o menu de opções, para o usuário escolher outra opção ou sair do programa
        return;
    } // Fecha a verificação de email preenchido em branco, ou com formato inválido, ou email já cadastrado

rl.question ("Digite seu CPF: ", (CPF) => { 

    if (cpfincorreto(CPF)) { // Se a função de verificar o CPF preenchido em branco, ou com formato inválido, for true, o programa é encerrado
        menulooping(); // Chama a função de mostrar o menu de opções, para o usuário escolher outra opção ou sair do programa
        return;
    } // Fecha a verificação do CPF preenchido em branco, ou com formato inválido

rl.question ("Digite seu CEP: ", (CEP) => {

    if (cepincorreto(CEP))  { // Se a função de verificar o CEP preenchido em branco, ou com formato inválido, for true, o programa é encerrado
        menulooping(); // Chama a função de mostrar o menu de opções, para o usuário escolher outra opção ou sair do programa
        return;
    } // Fecha a verificação do CEP preenchido em branco, ou com formato inválido

     let usuario = { // Cria um objeto usuario com os dados fornecidos
        "Nome Completo": nomecompleto, // Atribui o valor de nomecompleto à propriedade "Nome Completo"
        "E_mail": email, // Atribui o valor de email à propriedade "E_mail"
        "CPF": CPF, // Atribui o valor de CPF à propriedade "CPF"
        "CEP": CEP, // Atribui o valor de CEP à propriedade "CEP"
        "Rua": "", // Atribui o valor de Rua à propriedade " "
        "Bairro": "", // Atribui o valor de Bairro à propriedade " "
        "Cidade": "", // Atribui o valor de Cidade à propriedade " "
        "Estado": "" // Atribui o valor de Estado à propriedade " "
        
            }; // Fecha o objeto usuario

console.log("\nObrigado por fornecer suas informações! Aguarde um momento, estamos verificando no nosso Banco de Dados..."); 

    buscarcep(CEP) // Chama a função de buscar o CEP na API ViaCEP, para pegar os dados de endereço do usuário, e depois salvar o usuário no arquivo JSON, e depois voltar para o menu de opções. O "buscarcep" é a função que faz a requisição para a API ViaCEP, e retorna os dados de endereço do usuário, ou um erro se o CEP for inválido ou se houver algum problema com a requisição. O "CEP" é o valor do CEP que o usuário digitou, e é usado como parâmetro para a função "buscarcep", para fazer a requisição para a API ViaCEP com o CEP fornecido pelo usuário.
    .then((dados) => { // Trata a resposta da função "buscarcep" e espera a resposta da API ViaCEP, para pegar os dados de endereço do usuário, ou um erro se o CEP for inválido ou se houver algum problema com a requisição. O "dados" é o valor retornado pela função "buscarcep", que pode ser os dados de endereço do usuário, ou um erro se o CEP for inválido ou se houver algum problema com a requisição. O "then" é para tratar a resposta da promessa, e executar a função que está dentro do "then", que é onde tem a lógica para pegar os dados de endereço do usuário, ou mostrar a mensagem de erro se o CEP for inválido ou se houver algum problema com a requisição.

        if (dados.erro) { // Verifica se a resposta da API ViaCEP tem a propriedade "erro", que indica que o CEP é inválido. Se tiver a propriedade "erro", mostra a mensagem de que o CEP não foi encontrado, e volta para o menu de opções, para o usuário digitar um CEP válido ou escolher outra opção.
            console.log("\nCEP não encontrado."); 
            menulooping(); // Depois de mostrar a mensagem de que o CEP não foi encontrado, mostra o menu de opções novamente, para o usuário escolher uma opção válida ou sair do programa
            return;
        } // Fecha a verificação de erro da resposta da API ViaCEP

        usuario.Rua = dados.logradouro; // Atribuo a minha identificação de Rua igual ao da API ViaCEP, que se chama de "logradouro"
        usuario.Bairro = dados.bairro;  // Atribuo a minha identificação de Bairro igual ao da API ViaCEP, que se chama de "bairro"
        usuario.Cidade = dados.localidade;  // Atribuo a minha identificação de Cidade igual ao da API ViaCEP, que se chama de "localidade"
        usuario.Estado = dados.uf;  // Atribuo a minha identificação de Estado igual ao da API ViaCEP, que se chama de "uf"

        salvarusuario(usuario); // Chama a função de salvar o usuário no arquivo JSON, para salvar o novo usuário cadastrado. O "salvarusuario" é a função que salva o usuário no arquivo JSON, e depois volta para o menu de opções. O "usuario" é o objeto que contém os dados do usuário fornecidos, e é usado como parâmetro para a função "salvarusuario", para salvar o novo usuário no arquivo JSON.
        menulooping() // Depois de salvar o usuário no arquivo JSON, mostra o menu de opções novamente, para o usuário escolher outra opção ou sair do programa
    }) // Fecha o tratamento da resposta da função "buscarcep"

    .catch((erro) => { // Trata/Resolve erros de falhas de internet/API fora do ar. O "erro" dentro, mostra o erro real que acontece, o verdadeiro diagnostico
        console.log("\nErro ao consultar o CEP.", erro); 
        menulooping(); // Depois de mostrar a mensagem de erro ao consultar o CEP, mostra o menu de opções novamente, para o usuário escolher outra opção ou sair do programa
    }); // Fecha o tratamento de erros da função "buscarcep"

}); // Fecha a pergunta do CPF
}); // Fecha a pergunta do CEP
}); // Fecha a pergunta do E-mail
}); // Fecha a pergunta do Nome Completo
} // Fecha a função de cadastro de usuários

menulooping(); // Chama a função de mostrar o menu de opções, para o usuário escolher o que quer fazer, e depois voltar para o menu de opções, para escolher outra opção ou sair do programa. O "looping" é para mostrar o menu de opções novamente, depois que o usuário escolher uma opção, para ele poder escolher outra opção ou sair do programa.