//==============================================================||
//	AUTOR: JEFERSON LUCAS
//	DATA DE CRIAÇÃO: 21/07/2018
//  DATA DE MODIFICAÇÃO: 05/08/2018
//  VERSÃO: 1.6.0-BETA
//	DESCRIÇÃO: CORE PARA CADASTRO/CONSULTA/FILTRO/VISUALIZAÇÃO
//	/EDIÇÃO E EXCLUSÃO DE RESERVAS DE PROFESSORES E ALUNOS
//==============================================================||
//	CLASSES DO APP
//
//	CLASSE PAI / RESERVA
	class Reserva {
		constructor(nome, equipamento, status) {
			this.nome 			= nome;
			this.equipamento 	= equipamento;
			this.status			= status; 
		}
	//	VALIDAR DADOS DE RESERVA
		validarDados() {
		//	VALIDAR OS DADOS DA RESERVA
			for (let r in this){
			//	VERIFICA SE O VALOR É INDEFINIDO/VAZIO/NULO
				if(this[r] === "" || this[r] === null || this[r] === undefined){
				//	RETORNA FALSO
					return false;
				}
			}
		//	RETORNA VERDADEIRO
			return true;
		}
	}
///
//	CLASSE FILHO / RESERVA DO PROFESSOR
	class ReservaProfessor extends Reserva {
		constructor(nome, equipamento, status, sala, dataA, horaA, dataB, horaB, horaC, horaD) {
		//	ACESSO AO ATRIBUTO PAI RESERVA
			super(nome, equipamento, status);
			this.sala 	= sala;
			this.dataA 	= dataA;
			this.dataB 	= dataB;
			this.horaA 	= horaA;
			this.horaB 	= horaB;
			this.horaC	= horaC;
			this.horaD 	= horaD;
		}
	}
//
//	CLASSE FILHO / RESERVA DO ALUNO
	class ReservaAluno extends Reserva {
		constructor(nome, equipamento, status, matricula, serial, dataA, horaA, dataB, horaB, horaC) {
		//	ACESSO AO ATRIBUTO PAI RESERVA
			super(nome, equipamento, status);
			this.matricula 	= matricula;
			this.serial 	= serial;
			this.dataA 		= dataA;
			this.dataB 		= dataB;
			this.horaA 		= horaA;
			this.horaB 		= horaB;
			this.horaC 		= horaC;
		}
	}
//
//	CLASSE FUNCIONÁRIO
	class Funcionario {
		constructor(nome, dataA, horaA, versao) {
			this.nome 	= nome;
			this.dataA 	= dataA;
			this.horaA 	= horaA;
			this.versao = versao;
		}
		validarFuncionario() {
			for(let f in this){
				if(this[f] === "" || this[f] === null || this[f] === undefined){
					return false;
				}
			}
			return true;
		}
	}	
//
//	CLASSE BANCO DE DADOS
	class BancodeDados {
		constructor(){
		//	RECEBE O ID E SETA EM UMA VARIÁVEL
			let idAluno 	= localStorage.getItem('idAluno');
			let idProfessor = localStorage.getItem('idProfessor');
		//	SE O ID FOR NULL
			if (idAluno === null) {
			//	SETA UM NOVO ID/CHAVE/VALOR
				localStorage.setItem('idAluno', 0);
			}
			if (idProfessor === null) {
			//	SETA UM NOVO ID/CHAVE/VALOR
				localStorage.setItem('idProfessor', 0);
			}
		}
	//	PEGAR UM NOVO ID
		getProximoId(nome) {
		//	PEGO O ID DO ALUNO E PROFESSOR E CONVERTE PARA INTEIRO
			let idAluno 	= parseInt(localStorage.getItem('idAluno')); 
			let idProfessor = parseInt(localStorage.getItem('idProfessor'));
			let proximoId 	= null;
		//
		//	SE O NOME FOR DO PROFESSOR
			if (nome == "Professor") {
			//	VERIFICAÇÃO
				if(idAluno > idProfessor) {
				//	ESTRUTURA FOR PARA RETORNAR NOVO VALOR DE ID
					for(let i = 0; i <= idAluno; i++) {
						proximoId = i + 1;
					}
				//	VALOR DE RETORNO
					return proximoId;
				//
				} else if(idProfessor > idAluno) {
				//	VALOR DE RETORNO
					proximoId = (idProfessor + 1);
				//	RETORNO DO NOVO VALOR DE ID
					return proximoId;
				//
				} else if(idProfessor == idAluno) {
				//	VALOR DE RETORNO
					proximoId = (idProfessor + 1);
				//	RETORNO DO NOVO VALOR DE ID
					return proximoId;
				}
				else {
				//	CASO NÃO TENHA VALOR RETORNO 0
					return 0;
				//
				}
			} 
		//	SE O NOME FOR DO ALUNO
			else if(nome == "Aluno") {
			//	VERIFICAÇÃO
				if(idProfessor > idAluno) {
				//	ESTRUTURA FOR PARA RETORNAR NOVO VALOR DE ID
					for(let i = 0; i <= idProfessor; i++){
						proximoId = i + 1;
					}
				//	RETORNO DO NOVO VALOR DE ID
					return proximoId;
				//	
				} else if(idAluno > idProfessor) {
				//	VALOR DE RETORNO
					proximoId = (idAluno + 1);
				//	
					return proximoId;
				//
				} else if(idAluno == idProfessor) {
				//	VALOR DE RETORNO
					proximoId = (idAluno + 1);
				//	
					return proximoId;
				//
				} else {
				//	CASO NÃO TENHA VALOR RETORNO 0
					return 0;
				//
				}
				//				
			}
		//
		}
	//	GRAVAR RESERVA
		gravar(reserva, nome) {
		//	VALOR DA getProximoId ATRIBUÍDO A UMA VARIÁVEL ID
			let id = this.getProximoId(nome);
		//
		//	CONVERTE VALORES E SETA PARA O LOCALSTRORAGE 
			localStorage.setItem(id, JSON.stringify(reserva));
		//
		//	ATUALIZA O ID COM A INFORMAÇÃO DO NOVO ID DA FUNÇÃO getProximoId()
			localStorage.setItem(`id${nome}`, id);
		}
		gravarFuncionario(funcionario) {
			let id = 0;
			localStorage.setItem(id, JSON.stringify(funcionario));
			localStorage.setItem("idFuncionario", id);
		}
	//	RECUPERAR DADOS DA RESERVA DO PROFESSOR
		recuperaReservaProfessor() {
		//	DEFINIÇÃO DE UM ARRAY DE RESERVAS
			let reservas = Array();
		//	PEGANDO O ID DO PROFESSOR NO LOCAL STORAGE
			let id = localStorage.getItem("idProfessor");
		//	ESTRUTURA FOR PRA EXTRAIR OS IDS DAS RESERVAS 
			for(let i = 0; i <= id; i++){
			//	CONVERTENDO AS RESERVAS EM JSON 
				let reserva = JSON.parse(localStorage.getItem(i));
			//	CASO ALGUM ITEM DA RESERVA SEJA INDEFINIDO CONTINUA E IGNORA A RESERVA
				if(reserva === null || reserva.nome === undefined || reserva.equipamento === undefined || reserva.status === undefined || reserva.sala === undefined || reserva.dataA === undefined || reserva.dataB === undefined || reserva.horaA === undefined || reserva.horaB === undefined) {
					continue;
				}
			//	ID DA RESERVA RECEBE O VALOR DE I
				reserva.id = i;
			//	INSERÇÃO DAS RESERVAS NO ARRAY RESERVAS
				reservas.push(reserva);
			}
		//	RETORNA AS RESERVAS
			return reservas;
		}
	//	RECUPERAR DADOS DA RESERVA DO ALUNO
		recuperaReservaAluno() {
		//	DEFINIÇÃO DE UM ARRAY DE RESERVAS
			let reservas = Array();
		//	PEGANDO O ID DO ALUNO NO LOCAL STORAGE
			let id = localStorage.getItem("idAluno");
		//	ESTRUTURA FOR PRA EXTRAIR OS IDS DAS RESERVAS 
			for(let i = 0; i <= id; i++){
			//	CONVERTENDO AS RESERVAS EM JSON 
				let reserva = JSON.parse(localStorage.getItem(i));
			//	CASO ALGUM ITEM DA RESERVA SEJA INDEFINIDO CONTINUA E IGNORA A RESERVA
				if(reserva === null || reserva.nome === undefined || reserva.equipamento === undefined || reserva.matricula === undefined || reserva.serial === undefined) {
					continue;
				}
			//	ID DA RESERVA RECEBE O VALOR DE I
				reserva.id = i;
			//	INSERÇÃO DAS RESERVAS NO ARRAY RESERVAS
				reservas.push(reserva);
			}
		//	RETORNA AS RESERVAS
			return reservas;
		}
		recuperaFuncionario() {
		//		
			let funcionarios = Array();
		//
			let id = localStorage.getItem("idFuncionario");
		//
			for(let i = 0; i <= id; i++) {
				let funcionario = JSON.parse(localStorage.getItem(i));
				if(funcionario === null){
					continue;
				}
				funcionario.id = i;
				funcionarios.push(funcionario);
			}
			return funcionarios;
		//
		}
	//	PESQUISAR E FILTRAR OS DADOS DA RESERVA
		pesquisaReserva(reserva, nome) {
		//	VERIFICAÇÃO
			if(nome == "Professor") {
			//
			//	ARRAY DAS RESERVAS FILTRADAS
				let reservasFiltradas = Array();
			//	ARRAY RECEBE O MÉTODO DE RECUPERAR OS REGISTROS
				reservasFiltradas = this.recuperaReservaProfessor();
			//
			//	FILTRO DO PROFESSOR
				if(reserva.nome != "") {
					reservasFiltradas = reservasFiltradas.filter(p => p.nome == reserva.nome);
				}
				if(reserva.equipamento != "") {
					reservasFiltradas = reservasFiltradas.filter(p => p.equipamento == reserva.equipamento);
				}
				if(reserva.sala != "") {
					reservasFiltradas = reservasFiltradas.filter(p => p.sala == reserva.sala);
				}
				if(reserva.horaA != "") {
					reservasFiltradas = reservasFiltradas.filter(p => p.horaA == reserva.horaA);
				}
				if(reserva.horaB != "") {
					reservasFiltradas = reservasFiltradas.filter(p => p.horaB == reserva.horaB);
				}
				if(reserva.dataA != "") {
					reservasFiltradas = reservasFiltradas.filter(p => p.dataA == reserva.dataA);
				}
			//	RETORNA O FILTRO
				return reservasFiltradas;
			//
			} else if (nome == "Aluno") {
			//
			//	ARRAY DAS RESERVAS FILTRADAS
				let reservasFiltradas = Array();
			//	ARRAY RECEBE O MÉTODO DE RECUPERAR OS REGISTROS
				reservasFiltradas = this.recuperaReservaAluno();
			//
			//	FILTRO DO PROFESSOR
				if(reserva.nome != "") {
					reservasFiltradas = reservasFiltradas.filter(a => a.nome == reserva.nome);
				}
				if(reserva.matricula != "") {
					reservasFiltradas = reservasFiltradas.filter(a => a.matricula == reserva.matricula);
				}
				if(reserva.equipamento != "") {
					reservasFiltradas = reservasFiltradas.filter(a => a.equipamento == reserva.equipamento);
				}
				if(reserva.serial != "") {
					reservasFiltradas = reservasFiltradas.filter(a => a.serial == reserva.serial);
				}
				if(reserva.dataA != "") {
					reservasFiltradas = reservasFiltradas.filter(p => p.dataA == reserva.dataA);
				}
			//	RETORNA O FILTRO
				return reservasFiltradas;
			//
			}
		//
		}
		versaoApp() {
		//	PEGA VERSÃO ATUAL GRAVADO NO LOCAL STORAGE
			let versao = localStorage.getItem("versao");
		//	SE NÃO HOUVER OU VERSÃO FOR ANTIGA
			if(versao === null || versao === "1.5.0-beta") {
			//	SETA UMA COM O VALOR DA NOVA VERSÃO
				localStorage.setItem("versao","1.6.0-beta");
			}
		}
		retornaVersao() {
			let versao = localStorage.getItem("versao");
			return versao;
		}	
	//	1.4.6 - REMOVER RESERVAS
		removerReserva(id) {
			localStorage.removeItem(id);
		}
	}
//
//==============================================================||
//
//	VARIÁVEl GLOBAl
//
	let bancodedados = new BancodeDados();
//
//==============================================================||
//	FUNÇÕES DO APP
//
//	FUNÇÃO CADASTRAR A RESERVA DO PROFESSOR
	function cadastrarReservaProfessor() {
	//	RESGATANDO O VALOR DA RESERVA	
		let nome 		= document.getElementById('professor');
		let equipamento = document.getElementById('equipamento');
		let status 		= "Aguardando";
		let sala 		= document.getElementById('sala');
		let dataA 		= document.getElementById('dataA');
		let horaA 		= document.getElementById('horaA');
		let dataB 		= "0000-00-00"
		let horaB 		= document.getElementById('horaB');
		let horaC 		= "00:00:00";
		let horaD 		= "00:00:00";
	//	INSTÂNCIA DA RESERVA DO PROFESSOR
		reserva = new ReservaProfessor(nome.value, equipamento.value, status, sala.value, dataA.value, horaA.value, dataB, horaB.value, horaC, horaD);
	//	VALIDAÇÃO
		 if(reserva.validarDados()) {	
		// 	GRAVA AS INFORMAÇÕES DA RESERVA NA CLASSE BANCODEDADOS
			bancodedados.gravar(reserva, "Professor");
		//	MODAL DE SUCESSO
			modalCadastar(reserva.nome, tabelaProfessorA("success", reserva.equipamento, reserva.sala, dataBR(reserva.dataA), reserva.horaA, reserva.horaB), "professor");
		//	LIMPA OS VALORES
			nome.value 			= "";
			equipamento.value 	= "";
			sala.value 			= "";
			dataA.value 		= "";
			horaA.value 		= "";
			horaB.value 		= "";
		//
		}
		else {
		//	MODAL DE ERRO
			modalCadastrarErro();
		//
		}
	}
//
//	FUNÇÃO CADASTRAR A RESERVA DO ALUNO
	function cadastrarReservaAluno() {
	//	RESGATANDO O VALOR DA RESERVA
		let nome 		= document.getElementById('aluno');
		let equipamento = document.getElementById('equipamento');
		let matricula 	= document.getElementById('matricula');
		let serial 		= document.getElementById('serial');
		let dataA 		= document.getElementById('dataA');
		let horaA  		= document.getElementById('horaA');
		let status 		= null;
		let horaB 		= null;
		let dataB 		= null;
		let horaC 		= "00:00:00";

		if(horaA.value == horaAtualB(0,0) && dataA.value == dataAtual()) {
		//	STATUS
			status = "Em uso";
		//	HORA
			horaA = horaAtual(0,0,0);
			horaB = horaAtual(0,0,0);
		//	DATA
			dataA = dataAtual();
			dataB = dataAtual();
		}
		else {
		//	STATUS
			status = "Aguardando";
		//	HORA
			horaA = document.getElementById('horaA').value;
			horaA = horaA+":00";
			horaB = "00:00:00";
		//	DATA
			dataA = document.getElementById('dataA').value;
			dataB = "0000-00-00";
		}
	//
	//	INSTÂNCIA DA RESERVA DO ALUNO
		reserva  = new ReservaAluno(nome.value, equipamento.value, status, matricula.value, serial.value, dataA, horaA, dataB, horaB, horaC);
	//	VALIDAÇÃO
		if(reserva.validarDados()){
		// 	GRAVA AS INFORMAÇÕES DA RESERVA NA CLASSE BANCODEDADOS
			bancodedados.gravar(reserva, "Aluno");
		//	MODAL DE SUCESSO
			modalCadastar(reserva.nome, tabelaAlunoA("success", reserva.matricula, reserva.equipamento, reserva.serial, dataBR(reserva.dataA), reserva.horaA), "aluno");
		//	LIMPA OS VALORES
			nome.value 			= "";
			matricula.value 	= "";
			equipamento.value 	= "";
			serial.value 		= "";
			horaA.value 		= "";
			dataA.value 		= "";
		//
		} else {
		//	MODAL DE ERRO
			modalCadastrarErro();
		//
		}
	//
	}
//
//	CADASTRAR NOME DO FUNCIONÁRIO
	function cadastrarFuncionario() {
	//	VERIFICA O NOME NO LOCAL STORAGE
		let id = localStorage.getItem("idFuncionario");
	//	DATA E HORA EXATAS
		let dataA = dataAtual();
		let horaA = horaAtual(0,0,0);
	//	DEFININDO NOVA VERSÃO DO APP
		bancodedados.versaoApp();
		let versao = bancodedados.retornaVersao();
	//
	//	SE O NOME FOR NULO
		if(id === null){
		//	DEFINE UM NOME NOME
         	let nome = prompt("Antes de começarmos informe o seu nome");
		//	O NOVO NOME É PASSADO PARA A INSTÂNCIA FUNCIONÁRIO
			let funcionario = new Funcionario(nome, dataA, horaA, versao);
		//	VALIDAÇÃO DO NOME DO FUNCIONÁRIO
			if(funcionario.validarFuncionario()){
			//	GRAVA O NOME DO FUNCIONÁRIO
				bancodedados.gravarFuncionario(funcionario);
			//	MODAL DE BEM VINDO
				modalCadastarFuncionario(funcionario.nome);
			}
		//	SE NÃO
			else{
			//
				modalErro();
			//	RECARREGA A PÁGINA
           		window.location.reload();
           	//
			}
		//
		}
	//
	}
//
//	LISTA DE RESERVAS DOS PROFESSORES
	function ListaReservasProfessores() {
	//	VERIFICA O NOME DO FUNCIONÁRIO E EXIBE DADOS DO FUNCIONÁRIO
		cadastrarFuncionario();
		dadosFuncionário();
	//	RELÓGIO
		relogio();
	//	ALERTA
		alertaP();
		alertaA();
	//	DECLARAÇÃO DO ARRAY RESERVAS
		let reservas = Array();
	//	SETANDO O VALOR DO ARRAY NA VARIÁVEL
		reservas = bancodedados.recuperaReservaProfessor();
	//	SELECIONANDO O ELEMENTO TBODY
		let listaReservas = document.getElementById("listaProfessores");
	//
	//	LISTANTO A RESERVA
 		reservas.forEach(function(p) {
 		//	CRIANDO A LINHA (TR)
 			let linha =	listaReservas.insertRow();
 		//	CRIAR AS COLUNAS (TD)
 			linha.insertCell(0).innerHTML = p.nome;
 			linha.insertCell(1).innerHTML = p.equipamento;
 			linha.insertCell(2).innerHTML = p.sala;
		//
			linha.insertCell(3).innerHTML = cor(p.status);
 		//	INSERÇÃO DO BOTÃO DE VIZUALIZAÇÃO/EDIÇÃO/EXCLUSÃO/VERIFICAÇÃO
 			linha.insertCell(4).append(
 				botaoVizualizarProfessor(	p.id ,p.nome, p.equipamento, p.status, p.sala, p.dataA, p.horaA, p.dataB, p.horaB, p.horaC, p.horaD)," ",
 				botaoEditarProfessor(		p.id ,p.nome, p.equipamento, p.status, p.sala, p.dataA, p.horaA, p.dataB, p.horaB, p.horaC, p.horaD)," ",
 				botaoExcluirProfessor(		p.id ,p.nome, p.equipamento, p.status, p.sala, p.dataA, p.horaA, p.dataB, p.horaB, p.horaC, p.horaD)," ",
 				botaoVerificarProfessor(	p.id ,p.nome, p.equipamento, p.status, p.sala, p.dataA, p.horaA, p.dataB, p.horaB, p.horaC, p.horaD)
 		//
 			);
 		//
		})
	}
//
//	PESQUISAR RESERVA DO PROFESSOR
	function pesquisarReservaProfessor() {
	//	RECUPERANDO OS VALORES DOS CAMPOS
		let nome 		= document.getElementById('professor').value;
		let equipamento = document.getElementById('equipamento').value;
		let sala 		= document.getElementById('sala').value;
		let horaA 		= document.getElementById('horaA').value;
		let horaB 		= document.getElementById('horaB').value;
		let dataA 		= document.getElementById('dataA').value;
		let status 		= ""; 
		let dataB 		= ""; 
	//	VALIDAÇÃO DA PESQUISA
		if(nome == "" && equipamento == "" && horaA == "" && dataA == "" && sala == "" && horaB == "") {
		//	MODAL DE ERRO
			modalPesquisarErro();
		//
		}
		else {
		//	PASANDO VALORES PARA UMA NOVA INSTÂNCIA
			let reserva = new ReservaProfessor(nome, equipamento, status, sala, dataA, horaA, dataB, horaB);
		//	INTÂNCIA DA RESERVA SENDO PASSADA PRO MÉTODO DE PESQUISA
			let reservas = bancodedados.pesquisaReserva(reserva, "Professor");
		//	SELECIONANDO O ELEMENTO DA TABELA
			let listaReservas = document.getElementById("listaProfessores");
		//	LIMPANDO TABELA
			listaReservas.innerHTML = "";
		//	LISTANDO A PESQUISA
			reservas.forEach(function(p) {
			//	CRIANDO A LINHA
				let linha = listaReservas.insertRow();
			//
			//	CRIAR AS COLUNAS
 				linha.insertCell(0).innerHTML = p.nome;
 				linha.insertCell(1).innerHTML = p.equipamento;
 				linha.insertCell(2).innerHTML = p.sala;
				linha.insertCell(3).innerHTML = cor(p.status);
 			//
 			//	INSERÇÃO DO BOTÃO DE VIZUALIZAÇÃO/EDIÇÃO/EXCLUSÃO/VERIFICAÇÃO
 				linha.insertCell(4).append(
 					botaoVizualizarProfessor(	p.id ,p.nome, p.equipamento, p.status, p.sala, p.dataA, p.horaA, p.dataB, p.horaB, p.horaC, p.horaD)," ",
 					botaoEditarProfessor(		p.id ,p.nome, p.equipamento, p.status, p.sala, p.dataA, p.horaA, p.dataB, p.horaB, p.horaC, p.horaD)," ",
 					botaoExcluirProfessor(		p.id ,p.nome, p.equipamento, p.status, p.sala, p.dataA, p.horaA, p.dataB, p.horaB, p.horaC, p.horaD)," ",
 					botaoVerificarProfessor(	p.id ,p.nome, p.equipamento, p.status, p.sala, p.dataA, p.horaA, p.dataB, p.horaB, p.horaC, p.horaD)
 			//
 				);
 			//
			})
		}
	//
	}
//
//	LISTA DE RESERVAS DOS ALUNOS
	function ListasReservasAlunos() {
	//	VERIFICA O NOME DO FUNCIONÁRIO E EXIBE DADOS DO FUNCIONÁRIO
		cadastrarFuncionario();		
		dadosFuncionário();
	//	RELÓGIO
		relogio();
	//	ALERTA
		alertaP();		
		alertaA();
	//	DECLARAÇÃO DO ARRAY RESERVAS
		let reservas = Array();
	//	SETANDO O VALOR DO ARRAY NA VARIÁVEL
		reservas = bancodedados.recuperaReservaAluno();
	//	SELECIONANDO O ELEMENTO TBODY
		let listaReservas = document.getElementById("listaAlunos");
	//	LISTANTO A RESERVA
 		reservas.forEach(function(a) {
		//	CRIANDO A LINHA (TR)
 			let linha =	listaReservas.insertRow();
 		//	CRIAR AS COLUNAS (TD)
 			linha.insertCell(0).innerHTML = a.nome;
 			linha.insertCell(1).innerHTML = a.matricula;
 			linha.insertCell(2).innerHTML = a.equipamento;
 			linha.insertCell(3).innerHTML = a.serial;
 			linha.insertCell(4).innerHTML = cor(a.status);
		//	INSERÇÃO DO BOTÃO DE VIZUALIZAÇÃO/EDIÇÃO/EXCLUSÃO
 			linha.insertCell(5).append(
 			//
 				botaoVizualizarAluno(	a.id, a.nome, a.equipamento, a.status, a.matricula, a.serial, a.dataA, a.horaA, a.dataB, a.horaB, a.horaC)," ",
 				botaoEditarAluno(		a.id, a.nome, a.equipamento, a.status, a.matricula, a.serial, a.dataA, a.horaA, a.dataB, a.horaB, a.horaC)," ",
 				botaoExcluirAluno(		a.id, a.nome, a.equipamento, a.status, a.matricula, a.serial, a.dataA, a.horaA, a.dataB, a.horaB, a.horaC)," ",
 				botaoVerificarAluno(	a.id, a.nome, a.equipamento, a.status, a.matricula, a.serial, a.dataA, a.horaA, a.dataB, a.horaB, a.horaC)
 			//
 			);
 		//
		})
	//
	}
//
//	PESQUISA RESERVA DO ALUNO
	function pesquisarReservaAluno() {
	//	RESGATANDO O VALOR DA RESERVA	
		let nome 		= document.getElementById('aluno').value;		
		let equipamento = document.getElementById('equipamento').value;
		let matricula 	= document.getElementById('matricula').value;
		let serial 		= document.getElementById('serial').value;
		let dataA 		= document.getElementById('dataA').value;
		let horaA 		= document.getElementById('horaA').value;
	//	VALIDAÇÃO DA PESQUISA
		if(nome == "" && equipamento == "" && matricula == "" && serial == "" && dataA == "" && horaA == "") {
		//	MODAL DE ERRO
			modalPesquisarErro();
		//
		} 
		else {
		//	INSTÂNCIA DA RESERVA DO ALUNO
			reserva  = new ReservaAluno(nome, equipamento,"", matricula, serial, dataA, horaA);
		//	INTÂNCIA DA RESERVA SENDO PASSADA PRO MÉTODO DE PESQUISA
			let reservas = bancodedados.pesquisaReserva(reserva, "Aluno");
		//	SELECIONANDO O ELEMENTO DA TABELA
			let listaReservas = document.getElementById("listaAlunos");	
		//	LIMPANDO TABELA
			listaReservas.innerHTML = "";
		//	LISTANDO A PESQUISA
			reservas.forEach(function(a) {
			//	CRIANDO A LINHA
				let linha = listaReservas.insertRow();
			//	CRIAR AS COLUNAS
				linha.insertCell(0).innerHTML = a.nome;
				linha.insertCell(1).innerHTML = a.matricula;
				linha.insertCell(2).innerHTML = a.equipamento;
				linha.insertCell(3).innerHTML = a.serial;
				linha.insertCell(4).innerHTML = cor(a.status);
			//	INSERÇÃO DO BOTÃO DE VIZUALIZAÇÃO/EDIÇÃO/EXCLUSÃO
 				linha.insertCell(5).append(
 				//
 					botaoVizualizarAluno(	a.id, a.nome, a.equipamento, a.status, a.matricula, a.serial, a.dataA, a.horaA, a.dataB, a.horaB, a.horaC)," ",
 					botaoEditarAluno(		a.id, a.nome, a.equipamento, a.status, a.matricula, a.serial, a.dataA, a.horaA, a.dataB, a.horaB, a.horaC)," ",
 					botaoExcluirAluno(		a.id, a.nome, a.equipamento, a.status, a.matricula, a.serial, a.dataA, a.horaA, a.dataB, a.horaB, a.horaC)," ",
 					botaoVerificarAluno(	a.id, a.nome, a.equipamento, a.status, a.matricula, a.serial, a.dataA, a.horaA, a.dataB, a.horaB, a.horaC)
 				//
 				);
 			//
			})
		}
	}
//
//
//	BOTÃO VIZUALIZAÇÃO
	let botaoVizualizarAluno = function(id, nome, equipamento, status, matricula, serial, dataA, horaA, dataB, horaB, horaC) {
	//	BOTAO DE VIZUALIZAÇÃO
 		let ver 		= document.createElement("button");
 		ver.className	= 'btn btn-outline-info btn-sm';
 		ver.title 		= "Vizualizar";
 		ver.innerHTML 	= '<i class="fa fa-eye"></i>';
 		ver.id 			= `id-ver-${id}`;
 	//	NO CLICAR DO BOTÃO OS DETALHES DA RESERVA SERÁ EXIBIDO EM UM MODAL
 		ver.onclick 	= function() {
		//	MODAL DE VIZUALIÇÃO
			modalVizualizar(nome, tabelaAlunoB("info", equipamento, cor(status), matricula, serial, dataBR(dataA), horaA, dataBR(dataB), horaB, horaC), "aluno");
		//
 		}
 		return ver;
	}
//
//	BOTAO DE VIZUALIZAÇÃO
	let botaoVizualizarProfessor = function(id, nome, equipamento, status, sala, dataA, horaA, dataB, horaB, horaC, horaD) {
	//	BOTAO DE VIZUALIZAÇÃO
 		let ver 		= document.createElement("button");
 		ver.className 	= 'btn btn-outline-info btn-sm';
 		ver.title 		= "Vizualizar";
 		ver.innerHTML 	= '<i class="far fa-eye"></i>';
 		ver.id 			= `id-ver-${id}`;
 		ver.onclick 	= function() {
 		//	MODAL DE VIZUALIÇÃO		
 			modalVizualizar(nome, tabelaProfessorB("info", equipamento, cor(status), sala, dataBR(dataA), horaA, dataBR(dataB), horaB, horaC, horaD), "professor");
		//
 		}
 		return ver;
	}
//
//	BOTÃO EDITAR
	let botaoEditarAluno = function(id, nome, equipamento, status, matricula, serial, dataA, horaA, dataB, horaB, horaC) {
	//	BOTAO DE EDIÇÃO
 		let editar 			= document.createElement("button");
 		editar.className 	= 'btn btn-outline-success btn-sm';
 		editar.title 		= "Editar";
 		editar.innerHTML 	= '<i class="fas fa-pencil-alt"></i>';
 		editar.id 			= `id-editar-${id}`;
 	//
 		editar.onclick 		= function() {
 		//	DATA DA RESERVA FOR MAIOR OU IGUAL A DATA EXATA
 			if(dataA >= dataAtual()) {
 			//	HORA 5 MIM ANTES
 				if(horaAtual(0,5,0) <= horaA) {
 				//	STATUS AGUARDANDO
	 				if(status == "Aguardando") {
		 			//	VERIFICAÇÃO
		 				let = resposta = prompt("Deseja EDITAR a reserva do(a) "+nome+"? R: Sim ou Não","Não");
		 			//	VALIDAÇÃO DE VERIFICAÇÃO
		 				if(resposta == "sim" || resposta == "SIM" || resposta == "Sim" || resposta == "s" || resposta == "S") {
						//	NOVOS VALORES SERÃO RECEBIDOS
		 					let _nome 			= prompt("Nome do(a) Aluno(a):", nome);
		 					let _matricula		= prompt("Matrícula:", matricula);
		 					let _equipamento 	= prompt("Descrição do equipamento:", equipamento);
		 					let _serial			= prompt("Nº de série:", serial);
		 					let _dataA			= prompt("Data:", dataBR(dataA));
		 					let _horaA			= prompt("Hora:", horaA);
						//	CRIAÇÃO DE UMA NOVA INSTÂNCIA RESERVA
							reserva  = new ReservaAluno(_nome, _equipamento, status, _matricula, _serial, dataEUA(_dataA), _horaA, dataB, horaB, horaC);
						//	VALIDAR DADOS
							if (reserva.validarDados()) {
							//	FORMATAR O ID
								let id = this.id.replace('id-editar-','');
							//	REMOVE A RESERVA
								bancodedados.removerReserva(id);						
							//	MODAL DE EDIÇÃO
		 						modalEditar(_nome, tabelaAlunoA("success", _equipamento, _matricula, _serial, _dataA, _horaA), "aluno");
							//	GRAVA AS INFORMAÇÕES NO BANCO DE DADOS
								bancodedados.gravar(reserva, "Aluno");
							//					
							}
						//	ERRO
							else {
							//
								modalErro();
							//
							}
		 				}
		 			}
		 			else {
	 				modalEditarErro(nome, "aluno");
	 				}
	 			}
 				else { 				
	 				modalEditarErro(nome, "aluno");
 				}  
 			}
 			else { 				
	 				modalEditarErro(nome, "aluno");
 			}  			
 		}
 		return editar;
 	}
//
//
	let botaoEditarProfessor = function(id, nome, equipamento, status, sala, dataA, horaA, dataB, horaB, horaC, horaD) {
	//	BOTAO DE EDIÇÃO
		let editar 			= document.createElement("button");
 		editar.className 	= 'btn btn-outline-success btn-sm';
 		editar.title 		= "Editar";
 		editar.innerHTML 	= '<i class="fas fa-pencil-alt"></i>';
 		editar.id 			= `id-editar-${id}`;
 	//
 		editar.onclick 		= function() {
 		//	DATA DA RESERVA FOR MAIOR OU IGUAL A DATA EXATA
 			if(dataA >= dataAtual()) {
 			//	HORA 5 MIM ANTES
 				if(horaAtual(0,5,0) <= horaA) {
 				//	STATUS AGUARDANDO
	 				if(status == "Aguardando") {
	 				//	VERIFICAÇÃO
	 					let = resposta = prompt("Deseja EDITAR a reserva do(a) "+nome+"? R: Sim ou Não","Não");
	 					//	VALIDAÇÃO DE VERIFICAÇÃO
	 					if(resposta == "sim" || resposta == "SIM" || resposta == "Sim" || resposta == "s" || resposta == "S") {
	 					//	NOVOS VALORES SERÃO RECEBIDOS
	 						let _nome 			= prompt("Nome do(a) Professor(a):", nome);
	 						let _equipamento 	= prompt("Descrição do equipamento:",equipamento);
	 						let _sala 			= prompt("Nome da sala:",sala);
	 						let _horaA 			= prompt("Início da aula:",horaA);
	 						let _horaB 			= prompt("Término da aula:",horaB);
	 						let _dataA 			= prompt("Data da aula:",dataBR(dataA));
	 					//	CRIAÇÃO DE UMA NOVA INSTÂNCIA RESERVA
							let reserva = new ReservaProfessor(_nome, _equipamento, status, _sala, dataEUA(_dataA), _horaA, dataB, _horaB, horaC, horaD);
						//	VALIDAR DADOS
							if (reserva.validarDados()) {
							//	FORMATAR O ID
								let id = this.id.replace('id-editar-','');
							//	REMOVE A RESERVA
								bancodedados.removerReserva(id);
							//	MODAL DE EDIÇÃO
	 							modalEditar(_nome, tabelaProfessorA("success", _equipamento, _sala, _dataA, _horaA, _horaB), "professor");
	 						//	GRAVA AS INFORMAÇÕES NO BANCO DE DADOS
								bancodedados.gravar(reserva, "Professor");
							//		 			
	 						}
	 					//	ERRO
	 						else{
	 						//
	 							modalErro();
	 						//
	 						}
						}
		 			}
		 			else {
	 					modalEditarErro(nome, "professor");
	 				}
	 			}
 				else { 				
	 				modalEditarErro(nome, "professor");
 				}  
 			}
 			else { 				
	 			modalEditarErro(nome, "professor");
 			}  			
 		}
 		return editar;
 	}
//
//	BOTÃO EXCLUIR
	let botaoExcluirAluno = function(id, nome, equipamento, status, matricula, serial, dataA, horaA, dataB, horaB, horaC) {
	//	BOTAO DE EXCLUSÃO
 		excluir 			= document.createElement("button");
 		excluir.className 	= 'btn btn-outline-danger btn-sm';
 		excluir.title 		= 'Excluir';
 		excluir.innerHTML 	= '<i class="fa fa-trash-alt"></i>';
 		excluir.id 			= `id-excluir-${id}`;
 	//
 		excluir.onclick = function() {
 	 	//	PRONPT DE VERIFICAÇÃO
			let resposta = prompt("Deseja EXCLUIR a reserva do(a) "+nome+"? R: Sim ou Não", "Não");
		//	VALIDAÇÃO DE EXCLUSÃO
			if (resposta == 'sim'|| resposta == 'SIM' || resposta == 'Sim' || resposta == 's' || resposta == 'S') {
			//	FORMATAR O ID
				let id = this.id.replace('id-excluir-','');
			//	REMOVE A RESERVA
 				bancodedados.removerReserva(id);
 			//	MODAL DE EXCLUSÃO
				modalExcluir(nome, tabelaAlunoB("danger", equipamento, cor(status), matricula, serial, dataBR(dataA), horaA, dataBR(dataB), horaB, horaC), "aluno");
			//
 			}
 		}
 		return excluir;
	}
//
	let botaoExcluirProfessor = function(id, nome, equipamento, status, sala, dataA, horaA, dataB, horaB, horaC, horaD) {
 	//	BOTAO DE EXCLUSÃO
 		excluir 			= document.createElement("button");
 		excluir.className 	= 'btn btn-outline-danger btn-sm';
 		excluir.title 		= 'Excluir';
 		excluir.innerHTML 	= '<i class="fa fa-trash-alt"></i>';
 		excluir.id 			= `id-excluir-${id}`;
 		excluir.onclick 	= function() {
 	 	//	PRONPT DE VERIFICAÇÃO
			let resposta = prompt("Deseja EXCLUIR a reserva do(a) "+nome+"? R: Sim ou Não", "Não");
		//	VALIDAÇÃO DE EXCLUSÃO
			if (resposta == 'sim'|| resposta == 'SIM' || resposta == 'Sim' || resposta == 's' || resposta == 'S') {
			//	FORMATAR O ID
				let id = this.id.replace('id-excluir-','');
			//	REMOVE A RESERVA
 				bancodedados.removerReserva(id);
			//	MODAL DE EXCLUSÃO 				
				modalExcluir(nome, tabelaProfessorB("danger", equipamento, cor(status), sala, dataBR(dataA), horaA, dataBR(dataB), horaB, horaC, horaD), "professor");
			//
			}
 		}
 		return excluir;
 	//
 	}
//
//	BOTÃO VERIFICAR
	let botaoVerificarAluno = function(id, nome, equipamento, status, matricula, serial, dataA, horaA, dataB, horaB, horaC) {
	//	BOTÃO VERIFICAR RESERVA
 		verificar 			= document.createElement("button");
 		verificar.className = "btn btn-outline-primary btn-sm";
 		verificar.title 	= "Verificar";
 		verificar.innerHTML = '<i class="fas fa-user-check"></i>';
 		verificar.id 		= `id-verifica-${id}`;
 		verificar.onclick 	= function() {
 		//	STATUS AGUARDANDO
 			if(status ==  "Aguardando") {
			//	PRONPT DE VERIFICAÇÃO
				let resposta = prompt("A reserva do(a) "+nome+" está em uso? R: Sim ou Não", "Não");
			//	VALIDAÇÃO DE EXCLUSÃO
				if (resposta == 'sim'|| resposta == 'SIM' || resposta == 'Sim' || resposta == 's' || resposta == 'S') {
				//	NOVOS VALORES
					let _nome 			= nome;
					let _equipamento 	= equipamento;
					let _status 		= "Em uso";
					let _matricula		= matricula;
					let _serial			= serial;
					let _dataA			= dataA;
					let _horaA 			= horaA;
					let _dataB 			= dataAtual();
					let _horaB 			= horaAtual(0,0,0);
					let _horaC 			= horaC;
				//	CRIAÇÃO DE UMA NOVA INSTÂNCIA RESERVA
					reserva  = new ReservaAluno(_nome, _equipamento, _status, _matricula, _serial, _dataA, _horaA, _dataB, _horaB, _horaC);
				//	VALIDAÇÃO
					if(reserva.validarDados()){
					//	FORMATAR O ID
						let id = this.id.replace('id-verifica-','');
					//	REMOVE A RESERVA
						bancodedados.removerReserva(id);
					//	MODAL DE VERIFICAÇÃO
						modalVerificar(_nome, tabelaAlunoB("primary", _equipamento, cor(_status), _matricula, _serial, dataBR(_dataA), _horaA, dataBR(_dataB), _horaB, _horaC), "aluno", _status);
					//	GRAVA AS INFORMAÇÕES NO BANCO DE DADOS
						bancodedados.gravar(reserva, "Aluno");
					// 			
					}
				//	ERRO
					else {
					//
						modalErro();
					//
					}
				}
 			}
 		//	STATUS EM USO
 			else if(status == "Em uso") {
			//	PRONPT DE VERIFICAÇÃO
				let resposta = prompt("A reserva do(a) "+nome+" está recolhida? R: Sim ou Não", "Não");
			//	VALIDAÇÃO DE EXCLUSÃO
				if (resposta == 'sim'|| resposta == 'SIM' || resposta == 'Sim' || resposta == 's' || resposta == 'S') {
				//	NOVOS VALORES
					let _nome 			= nome;
					let _equipamento 	= equipamento;
					let _status 		= "Recolhida";
					let _matricula		= matricula;
					let _serial			= serial;
					let _dataA			= dataA;
					let _horaA 			= horaA;
					let _dataB 			= dataAtual();
					let _horaB 			= horaB;		
					let _horaC 			= horaAtual(0,0,0);
				//	CRIAÇÃO DE UMA NOVA INSTÂNCIA RESERVA
					reserva  = new ReservaAluno(_nome, _equipamento, _status, _matricula, _serial, _dataA, _horaA, _dataB, _horaB, _horaC);
				//	VALIDAÇÃO
					if(reserva.validarDados()) {
					//	FORMATAR O ID
						let id = this.id.replace('id-verifica-','');
					//	REMOVE A RESERVA
						bancodedados.removerReserva(id);
					//	MODAL DE VERIFICAÇÃO
						modalVerificar(_nome, tabelaAlunoB("primary", _equipamento, cor(_status), _matricula, _serial, dataBR(_dataA), _horaA, dataBR(_dataB), _horaB, _horaC), "aluno", _status);
					//	GRAVA AS INFORMAÇÕES NO BANCO DE DADOS
						bancodedados.gravar(reserva, "Aluno");
					//
					}
				//	ERRO
					else {
					//
						modalErro();
					//
					}
				}
 			} 
 		//	STATUS RECOLHIDO
 			else  {
				//
					modalVerificarErro(nome, "aluno");
 				//
 			}

 		}
 		return verificar;
	}
//
//	BOTÃO VERIFICAR
	let botaoVerificarProfessor = function(id, nome, equipamento, status, sala, dataA, horaA, dataB, horaB, horaC, horaD) {
	//	BOTÃO VERIFICAR RESERVA
 		verificar 			= document.createElement("button");
 		verificar.className = "btn btn-outline-primary btn-sm";
 		verificar.title 	= "Verificar";
 		verificar.innerHTML = '<i class="fas fa-user-check"></i>';
 		verificar.id 		= `id-verifica-${id}`;
 		verificar.onclick 	= function() {
 		//
 			if(status ==  "Aguardando") {
		//	PRONPT DE VERIFICAÇÃO
			let resposta = prompt("A reserva do(a) "+nome+" já está em uso? R: Sim ou Não", "Não");
			//	VALIDAÇÃO DE EXCLUSÃO
				if (resposta == 'sim'|| resposta == 'SIM' || resposta == 'Sim' || resposta == 's' || resposta == 'S') {
				//	NOVOS VALORES					
					let _nome 		 = nome;
					let _equipamento = equipamento;
					let _status 	 = "Em uso";
					let _sala 		 = sala;
					let _dataA 		 = dataA;
					let _horaA 		 = horaA;
					let _horaB 		 = horaB;
					let _dataB 		 = dataAtual();
					let _horaC 		 = horaAtual(0,0,0);
					let _horaD 		 = horaD;
				//	CRIAÇÃO DE UMA NOVA INSTÂNCIA RESERVA
					reserva  = new ReservaProfessor(_nome, _equipamento, _status, _sala, _dataA, _horaA, _dataB, _horaB, _horaC, _horaD);
				//	VALIDAÇÃO
					if(reserva.validarDados()) {
					//	MODAL DE VERIFICAÇÃO
						modalVerificar(_nome, tabelaProfessorB("primary", _equipamento, cor(_status), _sala, dataBR(_dataA), _horaA, dataBR(_dataB), _horaB, _horaC, _horaD), "professor", _status);
					//	FORMATAR O ID
						let id = this.id.replace('id-verifica-','');
					//	REMOVE A RESERVA
						bancodedados.removerReserva(id);				
					//	GRAVA AS INFORMAÇÕES NO BANCO DE DADOS
						bancodedados.gravar(reserva, "Professor");
					//
					}
				//	ERRO
					else {
					//
						modalErro();
					//
					}
	 			}
 			} 	
 		//	STATUS EM USO
 			else if(status == "Em uso") {
			//	PRONPT DE VERIFICAÇÃO
				let resposta = prompt("A reserva do(a) "+nome+" foi recolhida? R: Sim ou Não", "Não");
			//	VALIDAÇÃO DE EXCLUSÃO
				if (resposta == 'sim'|| resposta == 'SIM' || resposta == 'Sim' || resposta == 's' || resposta == 'S') {
				//	NOVOS VALORES					
					let _nome 		 = nome;
					let _equipamento = equipamento;
					let _status 	 = "Recolhida";
					let _sala 		 = sala;
					let _dataA 		 = dataA;
					let _horaA 		 = horaA;
					let _horaB 		 = horaB;
					let _dataB 		 = dataB;
					let _horaC 		 = horaC;
					let _horaD 		 = horaAtual(0,0,0);
				//	CRIAÇÃO DE UMA NOVA INSTÂNCIA RESERVA
					reserva  = new ReservaProfessor(_nome, _equipamento, _status, _sala, _dataA, _horaA, _dataB, _horaB, _horaC, _horaD);
				//	VALIDAÇÃO DE DADOS
					if(reserva.validarDados()) {
					//	FORMATAR O ID
						let id = this.id.replace('id-verifica-','');
					//	REMOVE A RESERVA
						bancodedados.removerReserva(id);
					//	MODAL DE VERIFICAÇÃO
						modalVerificar(_nome, tabelaProfessorB("primary", _equipamento, cor(_status), _sala, dataBR(_dataA), _horaA, dataBR(_dataB), _horaB, _horaC, _horaD), "professor", _status);
					//	GRAVA AS INFORMAÇÕES NO BANCO DE DADOS
						bancodedados.gravar(reserva, "Professor");
					}
					else {
						modalErro();
					}
				}
 			}	
 		//	STATUS RECOLHIDO
 			else {	
 				//	MODAL DE ERRO 					
					modalVerificarErro(nome, "professor");
 				//
 			}
 		}
 		return verificar;
	}
//
//	ALERTA DA RESERVA DO PROFESSOR
	let alertaP = function() { setInterval(alertarReservaP, 30000); }
//	FUNÇÃO ALERTA DE RESERVA 
	function alertarReservaP() {
		
		reservas = bancodedados.recuperaReservaProfessor();

		reservas.forEach(function(p) {
		//	SE A DATA DA RESERVA FOR IGUAL A DATA ATUAL
			if(p.dataA == dataAtual()) {
			//	SE O STATUS FOR AGURARDANDO
				if(p.status == "Aguardando") {
				//	SE A HORA DE MONTAGEM FOR MAIOR OU IGUAL O DO HORA ATUAL
					if(horaAtualB(0,0) >= p.horaA){
					//	ALERTA DE RESERVA
						modalAlertarReserva(p.nome, tabelaProfessorB("warning", p.equipamento, cor(p.status), p.sala, dataBR(p.dataA), p.horaA, dataBR(dataAtual()), p.horaB, horaAtual(0,0,0), p.horaD), "professor", "iniciar");
					//
					}
				}
			//	SE O STATUS FOR EM USO
				if(p.status == "Em uso") {
				//	SE A HORA DE RETIRADA FOR MAIOR OU IGUAL O DO HORA ATUAL
					if(horaAtualB(0,0) >= p.horaB){
					//	ALERTA DE RESERVA
						modalAlertarReserva(p.nome, tabelaProfessorB("warning", p.equipamento, cor(p.status), p.sala, dataBR(p.dataA), p.horaA, dataBR(p.dataB), p.horaB, p.horaC, horaAtual(0,0,0)), "professor", "acabar");
					//
					}
				//
				}
			//
			}
		//
		})
	//
	}
//
	let dadosFuncionário = function() {
	//	ARRAY FUNCIONÁRIO
		let funcionario = Array();
	//	SETANDO O VALOR DO ARRAY NA VARIÁVEL
		funcionario = bancodedados.recuperaFuncionario();
	//	LISTANTO O FUNCIONÁRIO
 		funcionario.forEach(function(f) {
 		//	NOME DO FUNCIONÁRIO É EXIBIDO
			document.getElementById("funcionario").innerHTML = f.nome;
		//
		})
	//
	}
//
//
//	ALERTA DA RESERVA DO ALUNO
	let alertaA = function() { setInterval(alertarReservaA, 30000); }
//	FUNÇÃO ALERTA DE RESERVA 
	function alertarReservaA() {
		
		reservas = bancodedados.recuperaReservaAluno();

		reservas.forEach(function(a) {
		//	SE A DATA DA RESERVA FOR IGUAL A DATA ATUAL
			if(a.dataA == dataAtual()) {
			//	SE O STATUS FOR AGURARDANDO
				if(a.status == "Aguardando") {
				//	SE A HORA DE MONTAGEM FOR MAIOR OU IGUAL O DO HORA ATUAL
					if(horaAtualB(0,0) >= a.horaA){
					//	ALERTA DE RESERVA
						modalAlertarReserva(a.nome, tabelaAlunoB("warning", a.equipamento, cor(a.status), a.matricula, a.serial, dataBR(a.dataA), a.horaA, dataBR(a.dataB), a.horaB, a.horaC), "aluno", "iniciar");
					//
					}
				}
			//
			}
		//
		})
	//
	}
//
//
	let tabelaProfessorA = function(bg, equipamento, sala, dataA, horaA, horaB) {
	//	TABELA DO PROFESSOR
		let tabela = '<br><br><table class="table table-bordered text-center"><thead><tr class="text-center bg-'+bg+'"><th scope="col" class="text-white"><i class="fas fa-desktop" title="Equipamento"></i></th><th scope="col" class="text-white"><i class="fas fa-compass" title="Local"></i></th><th scope="col" class="text-white"><i class="fas fa-user-clock" title="Horário da reserva"></i></th></tr></thead><tbody><tr><td>'+equipamento+'</td><td>'+sala+'</td><td>'+dataA+'<br>'+horaA+' / '+horaB+'</td></tr></tbody></table>';
	//	RETORNO
		return tabela;
	//
	}
//
	let tabelaAlunoA = function(bg, equipamento, matricula, serial, dataA, horaA) {
	//	TABELA DO ALUNO
		let tabela = '<br><br><table class="table table-bordered text-center"><thead><tr class="text-center bg-'+bg+'"><th scope="col" class="text-white"><i class="fas fa-address-card" title="Matrícula"></i></th><th scope="col" class="text-white"><i class="fas fa-laptop" title="Equipamento"></i></th><th scope="col" class="text-white"><i class="fas fa-barcode" title="Nº de série"></i></th><th scope="col" class="text-white"><i class="fas fa-user-clock" title="Data e hora"></i></i></th></tr></thead><tbody><tr><th class="font-weight-normal">'+matricula+'</th><td>'+equipamento+'</td><td>'+serial+'</td><td>'+dataA+'<br>'+horaA+'</td></tr></tbody></table>';
	//	RETORNO
		return tabela;
	//
	}
//
	let tabelaProfessorB = function(bg, equipamento, status, sala, dataA, horaA, dataB, horaB, horaC, horaD) {
	//	TABELA DO PROFESSOR
		let tabela = '<br><br><table class="table table-bordered text-center"><thead><tr class="text-center bg-'+bg+'"><th scope="col" class="text-white"><i class="fas fa-desktop" title="Equipamento"></i></th><th scope="col" class="text-white"><i class="fas fa-compass" title="Local"></i></th><th scope="col" class="text-white"><i class="fas fa-user-clock" title="Horário da reserva"></i></th><th scope="col" class="text-white"><i class="fas fa-user-clock" title="Horário final"></i></th><th class="text-white" title="Status"><i class="fas fa-clipboard-check" title="Status"></i></th></tr></thead><tbody><tr><td>'+equipamento+'</td><td>'+sala+'</td><td>'+dataA+'<br>'+horaA+' / '+horaB+'</td><td>'+dataB+'<br>'+horaC+' / '+horaD+'</td><td>'+status+'</td></tr></tbody></table>';
	//	RETORNO
		return tabela;
	//
	}
//
	let tabelaAlunoB = function(bg, equipamento, status, matricula, serial, dataA, horaA, dataB, horaB, horaC) {
	//	TABELA DO ALUNO
		let tabela = '<br><br><table class="table table-bordered text-center"><thead><tr class="text-center bg-'+bg+'"><th scope="col" class="text-white"><i class="fas fa-address-card" title="Matrícula"></i></th><th scope="col" class="text-white"><i class="fas fa-laptop" title="Equipamento"></i></th><th scope="col" class="text-white"><i class="fas fa-barcode" title="Nº de série"></i></th><th scope="col" class="text-white"><i class="fas fa-user-clock" title="Horário da reserva"></i></th><th scope="col" class="text-white"><i class="fas fa-user-clock" title="Horário final"></i></th><th class="text-white" title="Status"><i class="fas fa-clipboard-check" title="Status"></i></th></tr></thead><tbody><tr><td>'+matricula+'</td><td>'+equipamento+'</td><td>'+serial+'</td><td>'+dataA+'<br>'+horaA+'</td><td>'+dataB+'<br>'+horaB+' / '+horaC+'</td><td>'+status+'</td></tr></tbody></table>';
	//	RETORNO
		return tabela;
	//
	}
//
	let tabelaApp = function(nome, versao, dataA, horaA) {
	//	TABELA DO APP
		let tabela = '<br><br><table class="table table-bordered text-center"><thead><tr class="text-center bg-info"><th scope="col" class="text-white"><i class="fas fa-user-circle" title="Funcionário"></i></th><th scope="col" class="text-white"><i class="fas fa-user-tag" title="Versão"></i></th><th scope="col" class="text-white"><i class="fas fa-user-clock" title="Cadastro"></th><th scope="col" class="text-white"><i class="fab fa-github" title="GitHub"></i></th></tr></thead><tbody><tr><td>'+nome+'</td><td>'+versao+'</td><td>'+dataA+'<br>'+horaA+'</td><td><b><a href="https://github.com/JefersonLucas/reserve" target="_blank" title="Projeto">GitHub</a></b></td></tr></tbody></table>';
	//	RETORNO
		return tabela;
	//
	}
//
//	MODIFICA A COR DO STATUS
	let cor = function(status){
	//
		let cor = null;
	//	AGUARDANDO
		if(status == "Aguardando") {
			cor = '<span class="text-danger"><b>'+status+'</b></span>';
		}
	//	EM USO
		else if(status == "Em uso") {
			cor = '<span class="text-success"><b>'+status+'</b></span>';
		}
	//	RECOLHIDO
		else {
			cor = '<span class="text-primary"><b>'+status+'</b></span>';
		}
	//	RETORNO
		return cor;
	//
	}
//
//	CONVERSÃO DA DATA NO FORMATO EUA PARA O BR
	let dataBR = function(dataEUA) {
	//
		let diaBR  = dataEUA.substr(8,2);
		let mesBR  = "/"+dataEUA.substr(5,2);
		let anoBR  = "/"+dataEUA.substr(0,4);
		let dataBR = diaBR+mesBR+anoBR;
	//
		return dataBR;
	//
	}					
//
//	CONVERSÃO DA DATA NO FORMATO BR PARA EUA
	let dataEUA = function(dataBR) {
	//
		let diaEUA  = dataBR.substr(6,4);
		let mesEUA  = "-"+dataBR.substr(3,2);
		let anoEUA  = "-"+dataBR.substr(0,2);
		let dataEUA = diaEUA+mesEUA+anoEUA;
	//
		return dataEUA;
	//
	}
//
//	RELÓGIO
	let relogio = function() {
		setInterval(calendario, 100);
	}
//
//	CALENDÁRIO
	function calendario() {
	//	DATA
		let data = dataAtual();
	//	HORA
		let hora = horaAtual(0,0,0);
	//	MENSAGEM
		let mensagem = null;
	//
		mensagem = hora >= "06:00:00" && hora <= "12:00:00" ? mensagem = "<i class='fas fa-sun'></i> Bom dia! "    : mensagem; 
		mensagem = hora >= "12:00:00" && hora <= "18:00:00" ? mensagem = "<i class='fas fa-sun'></i> Boa tarde! "  : mensagem;	
		mensagem = hora >= "18:00:00" || hora <= "06:00:00" ? mensagem = "<i class='fas fa-moon'></i> Boa noite! " : mensagem;
	//
		document.getElementById("tempo").innerHTML = mensagem+"hoje é "+dataBR(data)+" e são "+hora+" |";
	//
	}
//
//	RETORNA A DATA ATUAL
    let dataAtual = function() {
	//
	//	INSTÂNCIA DATA
		let time = new Date();
	//	DATA
		let ano = time.getFullYear();
		let mes = time.getMonth() + 1;
		let dia = time.getDate();
	//	AJUSTE NA DATA
		mes = mes < 10 ? mes = "0"+mes : mes;
		dia = dia < 10 ? dia = "0"+dia : dia;
	//	DATA NO FORMATO EUA
		let data = ano+"-"+mes+"-"+dia;
	//	RETORNO
		return data;
	//
    }
//
//
//	RETORNA A HORA ATUAL COM SEGUNDOS
    let horaAtual = function(h, m, s) {
    //	INSTÂNCIA DATA
		let time = new Date();
    //	HORA
		let horas 	 = time.getHours() + h;
		let minutos  = time.getMinutes() + m;
		let segundos = time.getSeconds() + s;
	//	AJUSTE NA HORAs
		horas 	 = horas 	< 10 ? horas 	= "0"+horas 	: horas;
		minutos  = minutos 	< 10 ? minutos 	= "0"+minutos 	: minutos;
		segundos = segundos < 10 ? segundos = "0"+segundos 	: segundos;
	//	HORA + MINUTOS + SEGUNDOS
		let hora = horas+":"+minutos+":"+segundos;
	//	RETORNO
		return hora;
	//
    }
//
//	RETORNA A HORA ATUAL SEM OS SEGUNDOS
    let horaAtualB = function(h, m) {
    //	INSTÂNCIA DATA
		let time = new Date();
    //	HORA
		let horas 	 = time.getHours() + h;
		let minutos  = time.getMinutes() + m;
	//	AJUSTE NA HORA
		horas 	= horas   < 10 ? horas 	 = "0"+horas   : horas;
		minutos = minutos < 10 ? minutos = "0"+minutos : minutos;
	//	HORA + MINUTOS
		let hora = horas+":"+minutos;
	//	RETORNO
		return hora;
	//
    }
//
//	INFORMAÇÃO DO APP
	function infoApp() {
	//	ARRAY FUNCIONÁRIO
		let funcionario = Array();
	//	SETANDO O VALOR DO ARRAY NA VARIÁVEL
		funcionario = bancodedados.recuperaFuncionario();
	//	LISTANTO A RESERVA
 		funcionario.forEach(function(f) {
 		//	MODAL DE VIZUALIÇÃO
 			modalInfoApp(tabelaApp(f.nome, f.versao, dataBR(f.dataA), f.horaA));
		//
		})
	//
	}
//
//	IMPRIME AS RESERVAS
	function imprimir() {
	//
	//	VARIÁVEL RECEBE O CONTEÚDO DA DIV TABELA
        let imprime = document.getElementById('conteudo-imprecao').innerHTML;
    //	UMA NOVA JANELA ABRE E É SETADA EM UMA VARIÁVEL
        telaImpressao = window.open('about:blank');
    //	IMPRESÃO DO CONTEÚDO
        telaImpressao.document.write(imprime);
        telaImpressao.window.print();
        telaImpressao.window.close();
    }
//
//	ATUALIZA A PÁGINA
 	function atualizar() {
 	//	ATUALIZA A PÁGINA
 		window.location.reload();
	}
//
//=============================================================||
//	FUNÇÕES BOOTSTRAP
//
//	POPOVER
	$(function () {
  		$('[data-toggle="popover"]').popover();
	})
//
//	TOOLTIP
	$(function () {
  		$('[data-toggle="tooltip"]').tooltip();
	})
//
//==============================================================||
//	MODAL DE CADASTRO
//
	let modalCadastar = function(nome, tabela, responsavel) {
	//
		$('#modal1').modal('show');
		document.getElementById('modal-titulo-1').innerHTML 	= '<i class="fas fa-check-circle"></i> Sucesso!';
		document.getElementById('modal-documento-1').className	= 'modal-dialog border border-success rounded alert-success';
		document.getElementById('modal-cabecalho-1').className  = 'modal-header text-white bg-success';
		document.getElementById('modal-conteudo-1').innerHTML 	= 'A reserva do '+responsavel+'(a) <span class="text-success"><b>'+nome+'</b></span> foi cadastrada com <span class="text-success"><b>sucesso!</b></span><br>'
		document.getElementById('modal-conteudo-1').innerHTML  += tabela;
		document.getElementById('modal-botao-1').innerHTML 		= 'Voltar';
		document.getElementById('modal-botao-1').className 		= 'btn btn-outline-success';
	//
	}
//	
	function modalCadastrarErro() {
	//
		$('#modal2').modal('show');		
		document.getElementById('modal-titulo-2').innerHTML 	= '<i class="fas fa-times-circle"></i> Erro!';
		document.getElementById('modal-documento-2').className	= 'modal-dialog border border-danger rounded alert-danger';
		document.getElementById('modal-cabecalho-2').className  = 'modal-header text-white bg-danger';
		document.getElementById('modal-conteudo-2').innerHTML	= 'Erro ao efetuar seu <span class="text-danger"><b>cadastro</b></span>. Por favor verifique se todos os campo foram inseridos corretamente.';
		document.getElementById('modal-botao-2').innerHTML		= 'Corrigir';
		document.getElementById('modal-botao-2').className 		= 'btn btn-outline-danger';
	//
	}
//
//==============================================================||
//	MODAL DE VIZUALIZAÇÃO
//	
	let modalVizualizar = function(nome, tabela, responsavel) {		
 	//
 		$('#modal2').modal('show');
		document.getElementById('modal-titulo-2').innerHTML 	= '<i class="fas fa-eye"></i> Informações';
		document.getElementById('modal-documento-2').className	= 'modal-dialog modal-lg border border-info rounded alert-info';
		document.getElementById('modal-cabecalho-2').className  = 'modal-header text-white bg-info';
		document.getElementById('modal-conteudo-2').innerHTML 	= 'Detalhes da reserva do(a) '+responsavel+'(a) <span class="text-info"><b>'+nome+'</b></span>:';
		document.getElementById('modal-conteudo-2').innerHTML  += tabela;
		document.getElementById('modal-botao-2').innerHTML 		= 'Voltar';
		document.getElementById('modal-botao-2').className 		= 'btn btn-outline-info';
	//
	}
//
//==============================================================||
//	MODAL DE EDIÇÃO
//
	let modalEditar = function(nome, tabela, responsavel) {
	//
 		$('#modal1').modal('show');
 		document.getElementById('modal-titulo-1').innerHTML 	= '<i class="fas fa-pencil-alt"></i> Editar';
		document.getElementById('modal-documento-1').className	= 'modal-dialog border border-success rounded alert-success';
		document.getElementById('modal-cabecalho-1').className  = 'modal-header text-white bg-success';
		document.getElementById('modal-conteudo-1').innerHTML 	= 'A reserva do(a) '+responsavel+'(a) <span class="text-success"><b>'+nome+'</b></span> foi alterada com <span class="text-success"><b>sucesso!</b></span>';
		document.getElementById('modal-conteudo-1').innerHTML  += tabela;
		document.getElementById('modal-botao-1').innerHTML 		= 'Voltar';
		document.getElementById('modal-botao-1').className 		= 'btn btn-outline-success';
	//
	}
//	
	let  modalEditarErro = function(nome, responsavel) {
	//
		$('#modal2').modal('show');		
		document.getElementById('modal-titulo-2').innerHTML 	= '<i class="fas fa-times-circle"></i> Erro!';
		document.getElementById('modal-documento-2').className	= 'modal-dialog border border-danger rounded alert-danger';
		document.getElementById('modal-cabecalho-2').className  = 'modal-header text-white bg-danger';
		document.getElementById('modal-conteudo-2').innerHTML	= 'Você não pode alterar a reserva do(a) '+responsavel+'(a) <span class="text-danger"><b>'+nome+'</b></span>.';
		document.getElementById('modal-botao-2').innerHTML		= 'Voltar';
		document.getElementById('modal-botao-2').className 		= 'btn btn-outline-danger';
	//
	}
//
//==============================================================||
//  MODAL DE EXCLUSÃO
//
	let modalExcluir = function(nome, tabela, responsavel) {
	//
	 	$('#modal1').modal('show');
 		document.getElementById('modal-titulo-1').innerHTML 	= '<i class="fa fa-trash-alt"></i> Excluir';
		document.getElementById('modal-documento-1').className	= 'modal-dialog modal-lg border border-danger rounded alert-danger';
		document.getElementById('modal-cabecalho-1').className  = 'modal-header text-white bg-danger';
		document.getElementById('modal-conteudo-1').innerHTML 	= 'A reserva do(a) '+responsavel+'(a) <span class="text-danger"><b>'+nome+'</b></span> irá ser <span class="text-danger"><b>excluida!</b></span>';
		document.getElementById('modal-conteudo-1').innerHTML  += tabela;
		document.getElementById('modal-botao-1').innerHTML 		= 'Voltar';
		document.getElementById('modal-botao-1').className 		= 'btn btn-outline-danger';
	//
	}
//
//==============================================================||
//	MODAL DE VERIFICAÇÃO
//
	let modalVerificar = function(nome, tabela, responsavel, status) {
	//
 		$('#modal1').modal('show');
 		document.getElementById('modal-titulo-1').innerHTML 	= '<i class="fas fa-user-check"></i> Verificada';
		document.getElementById('modal-documento-1').className	= 'modal-dialog modal-lg border border-primary rounded alert-primary';
		document.getElementById('modal-cabecalho-1').className  = 'modal-header text-white bg-primary';
		document.getElementById('modal-conteudo-1').innerHTML 	= 'A reserva do(a) '+responsavel+'(a) <span class="text-primary"><b>'+nome+'</b></span> está <span class="text-primary"><b>'+status+'</b></span>!';
		document.getElementById('modal-conteudo-1').innerHTML  += tabela;
		document.getElementById('modal-botao-1').innerHTML 		= 'Voltar';
		document.getElementById('modal-botao-1').className 		= 'btn btn-outline-primary';
	//
	}
//
	let modalVerificarErro = function(nome, responsavel) {
	//
 		$('#modal2').modal('show');
 		document.getElementById('modal-titulo-2').innerHTML 	= '<i class="fas fa-user-check"></i> Verificada';
		document.getElementById('modal-documento-2').className	= 'modal-dialog border border-danger rounded alert-danger';
		document.getElementById('modal-cabecalho-2').className  = 'modal-header text-white bg-danger';
		document.getElementById('modal-conteudo-2').innerHTML 	= 'A reserva do(a) '+responsavel+'(a) <span class="text-danger"><b>'+nome+'</b></span> já foi <span class="text-danger"><b>recolhida!</b></span>';
		document.getElementById('modal-botao-2').innerHTML 		= 'Voltar';
		document.getElementById('modal-botao-2').className 		= 'btn btn-outline-danger';
	//
	}
//
//==============================================================||
//	MODAL DE ALERTA
//
	let modalAlertarReserva = function(nome, tabela, responsavel, alerta) {
	//
		$('#modal2').modal('show');
		document.getElementById('modal-titulo-2').innerHTML 	= '<i class="fas fa-bell" title="Alerta"></i> Atenção!';
		document.getElementById('modal-documento-2').className  = 'modal-dialog modal-lg border border-warning rounded alert-warning';
		document.getElementById('modal-cabecalho-2').className  = 'modal-header text-white bg-warning';
		document.getElementById('modal-conteudo-2').innerHTML 	= 'A reserva do(a) '+responsavel+'(a) <span class="text-warning"><b>'+nome+'</b></span> já está pra <span class="text-warning"><b>'+alerta+'!</b></span>';
		document.getElementById('modal-conteudo-2').innerHTML  += tabela;
		document.getElementById('modal-botao-2').innerHTML 		= 'Voltar';
		document.getElementById('modal-botao-2').className 		= 'btn btn-outline-warning';
	//
	}
//
//==============================================================||
//	MODAIS DE DIVERSO
//
	let modalInfoApp = function(tabela) {
	//
 		$('#modal2').modal('show');
		document.getElementById('modal-titulo-2').innerHTML 	= '<i class="fa fa-info-circle"></i> Informações';
		document.getElementById('modal-documento-2').className	= 'modal-dialog border border-info rounded alert-info';
		document.getElementById('modal-cabecalho-2').className  = 'modal-header text-white bg-info';
		document.getElementById('modal-conteudo-2').innerHTML 	= 'Informações dos detalhes do App Reserve:';
		document.getElementById('modal-conteudo-2').innerHTML  += tabela;
		document.getElementById('modal-botao-2').innerHTML 		= 'Voltar';
		document.getElementById('modal-botao-2').className 		= 'btn btn-outline-info';
	//
	}
//
	let modalCadastarFuncionario = function(nome) {
	//
		$('#modal2').modal('show');
		document.getElementById('modal-titulo-2').innerHTML 	= '<i class="fas fa-user-circle"></i> '+nome+' seja bem vindo(a)!';
		document.getElementById('modal-documento-2').className	= 'modal-dialog border border-info rounded alert-info';
		document.getElementById('modal-cabecalho-2').className  = 'modal-header text-white bg-info';
		document.getElementById('modal-conteudo-2').innerHTML 	= 'O App Reserve está atualizado com novas funcionalidades para a reserva dos equipamentos. Você pode obter mais informações vendo nesse <a href="https://github.com/JefersonLucas/reserve#changelog--versões" target="_blank">link</a> aqui.';
		document.getElementById('modal-botao-2').innerHTML 		= 'Voltar';
		document.getElementById('modal-botao-2').className 		= 'btn btn-outline-info';
	//
	}
//
	function modalErro() {
	//
		$('#modal2').modal('show');		
		document.getElementById('modal-titulo-2').innerHTML 	= '<i class="fas fa-times-circle"></i> Erro!';
		document.getElementById('modal-documento-2').className	= 'modal-dialog border border-danger rounded alert-danger';
		document.getElementById('modal-cabecalho-2').className  = 'modal-header text-white bg-danger';
		document.getElementById('modal-conteudo-2').innerHTML	= 'Desculpe houve algum <span class="text-danger"><b>erro</b></span>!';
		document.getElementById('modal-botao-2').innerHTML		= 'Voltar';
		document.getElementById('modal-botao-2').className 		= 'btn btn-outline-danger';
	//
	}
//
	function modalPesquisarErro() {
	//
		$('#modal2').modal('show');		
		document.getElementById('modal-titulo-2').innerHTML 	= '<i class="fas fa-times-circle"></i> Erro!';
		document.getElementById('modal-documento-2').className	= 'modal-dialog border border-danger rounded alert-danger';
		document.getElementById('modal-cabecalho-2').className  = 'modal-header text-white bg-danger';
		document.getElementById('modal-conteudo-2').innerHTML	= 'Erro ao efetuar sua <span class="text-danger"><b>pesquisa</b></span>. Por favor verifique se todos os campo foram inseridos corretamente.';
		document.getElementById('modal-botao-2').innerHTML		= 'Corrigir';
		document.getElementById('modal-botao-2').className 		= 'btn btn-outline-danger';
	//
	}
//
//=============================================================||