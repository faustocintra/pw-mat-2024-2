//import React from 'react'
import React, { useRef } from 'react';
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3'
import { ptBR } from 'date-fns/locale/pt-BR'
import { parseISO } from 'date-fns'
import MenuItem from '@mui/material/MenuItem'
import Button from '@mui/material/Button'
import { feedbackWait, feedbackNotify, feedbackConfirm } from '../../ui/Feedback'
import { useNavigate, useParams } from 'react-router-dom'
import MaskedInput from 'react-text-mask';
import { useState, useEffect } from 'react';
import { NumericFormat } from 'react-number-format';



export default function CarsForm() {

  const formDefaults = {
    brand: '',
    model: '',
    color: '',
    year_manufacture: null,
    imported: 0,
    plates: '',
    selling_price: '',
    selling_date: null,
  }

  // Usa formDefaults como inicialização
  //const [formData, setFormData] = useState(formDefaults);






  /*USA O USEPARAMS() PARA CAPTURAR APENAS O ID
  permite acessar os parâmetros de uma URL no seu componente, 
  geralmente quando você está usando rotas dinâmicas.
  Ex: A URL pode ser algo como /car/1234, onde 1234 é o valor do parâmetro id.
  O React Router sabe qual URL está aberta porque ele lida com o roteamento 
  da aplicação, e o useParams() acessa essa URL e extrai os parâmetros dela 
  automaticamente.
  */
  const { id } = useParams(); // Captura o ID da URL

  /*a função dentro do useEffect será executada sempre que o valor de id mudar.*/
  useEffect(() => {
    if (id) {
      /*O método then() é usado para lidar com a resposta da função fetchCarDetails(id).
       Quando os dados são recebidos com sucesso (ou seja, quando a Promise resolve), 
       o parâmetro data contém esses dados.*/
      fetchCarDetails(id).then((data) => {
        // Combina O FormDefaults com os dados recebidos da consulta ao BD.
        if (data) setFormData({ ...formDefaults, ...data });
      });
    }
    //toda vez que o parâmetro "id" mudar.
  }, [id]);


  async function fetchCarDetails(id) {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE2}/${id}`);
      if (!response.ok) {
        //sai do try
        throw new Error('Falha ao buscar os detalhes do carro');
      }
      //se tiver resposta coloca dentro de data
      const data = await response.json();
      //e retorna data
      return data;
    } catch (error) {
      console.error('Erro ao buscar os detalhes do carro:', error);
      return null;
    }
  }



  //const inputRef = useRef(null);









  /*USA O USEPARAMS() PARA CAPTURAR TODOS OS PARAMS
  hook fornecido pelo React Router que retorna um objeto contendo
   todos os parâmetros da URL atual.
   se a URL for algo como http://example.com/cars/123 será igual a "123".

  */
  const params = useParams()
  React.useEffect(() => {
    if (params.id) loadData()
    /*o array de dependências está vazio ([]), 
      o que significa que o efeito será executado apenas uma vez, 
      logo após a primeira renderização do componente.
      Ou seja: quando a página for carregado*/
  }, [])



  /*CAR - você está criando um estado state com duas propriedades:
 car (com os valores de formDefaults),
 formModified (inicializado como false).*/
  const [state, setState] = React.useState({
    car: { ...formDefaults },
    formModified: false
  })

  /* aqui o car está sendo desestruturado da variável state
  Se torna uma variável que armazena o valor de state.car*/
  const { car, formModified } = state

  //FUNÇÃO LOADDATA()
  async function loadData() {
    feedbackWait(true);
    try {
      const response = await fetch(import.meta.env.VITE_API_BASE2 + '/' + params.id);
      const result = await response.json();
      console.log(result);

      // Verifica se a data está no formato correto (string ISO ou já Date)
      if (result.selling_date) {
        // pega STRING e transforma para objeto DATE
        result.selling_date = parseISO(result.selling_date);
      }

      /*
      O operador de espalhamento (...) pega todas as propriedades do objeto params 
      e as coloca no novo objeto.
      A propriedade car é definida com o valor de result, 
      que é o resultado da chamada fetch, provavelmente contendo os dados do carro
       (como detalhes do carro). Este valor provavelmente é um objeto com as 
       informações detalhadas do carro. 
       Ou seja: o car, que vem de FormDefaults, será atualizado com o valor tirado do BD
       A propriedade car receberá o valor de result.
      */
      setState({ ...params, car: result });


    } catch (error) {
      console.log(error);
      feedbackNotify('ERRO: ' + error.message, 'error');
      /*O bloco finally é parte de um tratamento de exceções em JavaScript, 
      e ele sempre será executado independentemente de um erro ter ocorrido 
      ou não dentro do bloco try ou catch.*/
    } finally {
      feedbackWait(false);
    }
  }





  /*Quando você chama useNavigate(), ele retorna a função navigate, 
  que pode ser usada para redirecionar o usuário para outra página ou rota.
 
  */
  const navigate = useNavigate()
  async function handleFormSubmit(event) {
    // Impede o recarregamento da página
    event.preventDefault();

    feedbackWait(true);
    try {
      // Filtra os campos do objeto 'car', removendo valores 'null' ou strings vazias
      const filteredCar = Object.fromEntries(
        Object.entries(car).filter(([_, value]) => value !== null && value !== '')
      );

      // Prepara as opções para o fetch
      const reqOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(filteredCar)
      };

      // Se estivermos editando um carro (ou seja, se 'params.id' existir), usamos o PUT
      if (params.id) {
        reqOptions.method = 'PUT'; // Muda para PUT
        await fetch(
          `${import.meta.env.VITE_API_BASE2}/${params.id}`, // Usa o ID para identificar o carro
          reqOptions
        );
      }
      // Caso contrário, estamos criando um novo carro, então usamos POST
      else {
        await fetch(
          `${import.meta.env.VITE_API_BASE2}/cars`, // Envia para a rota de criação
          reqOptions
        );
      }

      // Após salvar com sucesso, notifica o usuário e redireciona para a listagem
      feedbackNotify('Item salvo com sucesso.', 'success', 4000, () => {
        /* No meu código, a função navigate() está sendo usada no handleFormSubmit
        para redirecionar o usuário para a página anterior após salvar os dados 
        do formulário com sucesso no feedbackNotify */
        navigate('..', { relative: 'path', replace: true });
      });

    } catch (error) {
      console.log(error);
      feedbackNotify('ERRO: ' + error.message, 'error');
    } finally {
      /* garantir que, após a requisição (seja ela bem-sucedida ou falha), 
      a interface do usuário mostre que o carregamento foi concluído, 
      desligando o "feedback de espera".*/
      feedbackWait(false);
    }
  }


 



  /*HANDLFIELDCHANGE
   MUDA O FORMULÁRIO, MUDA O OBJETO CAR.
   */
  function handleFieldChange(event) {
    // Vamos observar no console as informações que chegam
    // à função handleFieldChange
    console.log({ name: event.target.name, value: event.target.value })

    /* Tira uma cópia da variável de estado car - que continha os default,
    mas depois recebeu os valores do BD
    */
    const carCopy = { ...car }

    // Altera em carCopy apenas o campo da vez
    carCopy[event.target.name] = event.target.value

    // Atualiza a variável de estado, substituindo o objeto
    // car por sua cópia que foi atualizada e agora o formulário foi passado para true
    setState({ ...state, car: carCopy, formModified: true })
  }


  async function handleBackButtonClick() {
    if (
      //se o formulário que recebeu valores do BD for modificado
      formModified &&
      //e se o usuário não confirmar que quer voltar
      ! await feedbackConfirm('Há informações não salvas. Deseja realmente voltar?')
    ) return // Sai da função sem fazer nada

    /* Aqui o usuário respondeu que quer voltar e perder os dados
    "".."vai para o diretório pai da URL atual.
    se a URL atual for /car/123/edit, ao usar '..' 
    você será redirecionado para /car/123, subindo um nível na hierarquia.
    PATH: a navegação será feita com base na estrutura da URL atual.
    TRUE: a nova URL substituirá a atual na pilha de navegação.

    */
    navigate('..', { relative: 'path', 'replace': true })
  }


  /*const brazilianStates */
  const listacores = [
    { value: 'amarelo', label: 'amarelo' },
    { value: 'azul', label: 'azul' },
    { value: 'bege', label: 'bege' },
    { value: 'lilás', label: 'lilás' },
    { value: 'oliva', label: 'oliva' },
    { value: 'verde', label: 'verde' },
    { value: 'vermelho', label: 'vermelho' },
    { value: 'roxo', label: 'roxo' },

  ]



  /*recebe o ano atual obtido por meio do objeto Date do JavaScript.
  retorna o ano atual da data no formato de 4 dígitos (por exemplo, 2024).*/
  const currentYear = new Date().getFullYear();
  /*Gerar uma lista de anos de 1951 até o ano atual (em ordem decrescente)
  por causa do for que faz decréscimo*/
  const years = [];
  for (let year = currentYear; year >= 1951; year--) {
    years.push(year);
  }




  return (
    <>
      { /* gutterBottom coloca um espaçamento extra abaixo do componente */}
      <Typography variant="h1" gutterBottom>
        {params.id ? `Editar Veículo #${params.id}` : 'Cadastrar novo veículo'}
      </Typography>

      <Box className="form-fields">
        <form onSubmit={handleFormSubmit}>

          {/*MARCA*/}
          {/* autoFocus = foco do teclado no primeiro campo */}
          <TextField
            variant="outlined"
            name="brand"
            label="Marca: "
            fullWidth
            required
            autoFocus
            value={car.brand}
            onChange={handleFieldChange}
          />

          {/*MODELO*/}
          <TextField
            variant="outlined"
            name="model"
            label="Modelo: "
            fullWidth
            required
            value={car.model}
            onChange={handleFieldChange}
          />


          {/*ANO DE FABRICAÇÃO*/}
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
            <DatePicker
              label="Ano de fabricação"
              views={['year']} // Apenas anos
              value={car.year_manufacture ? new Date(car.year_manufacture, 0, 1) : null}
              onChange={(date) => {
                const year = date ? date.getFullYear() : null;
                const event = { target: { name: 'year_manufacture', value: year } };
                handleFieldChange(event);
              }}
              slots={{
                textField: (params) => (
                  <TextField {...params} variant="outlined" fullWidth required />
                )
              }}
            />
          </LocalizationProvider>



          {/*COR*/}
          <TextField
            variant="outlined"
            name="color"
            label="Cor"
            fullWidth
            required
            value={car.color}
            select
            onChange={handleFieldChange}
          >
            {listacores.sort((a, b) => a.label.localeCompare(b.label)).map(color => (
              <MenuItem key={color.value} value={color.value}>
                {color.label}
              </MenuItem>
            ))}
          </TextField>


          {/*CHECKBOX*/}
          <div className="MuiFormControl-root">
            <label>
              <input
                type="checkbox"
                name="imported"
                checked={car.imported === 1}
                onChange={(event) => {
                  const eventFake = { target: { name: 'imported', value: event.target.checked ? 1 : 0 } };
                  handleFieldChange(eventFake);
                }}
              />
              Importado
            </label>
          </div>


          {/* PLACA */}
          <MaskedInput
            mask={[/[A-Za-z]/, /[A-Za-z]/, /[A-Za-z]/, '-', /\d/, /[A-J0-9]/, /\d/, /\d/]}
            placeholder="Digite a placa"
            guide={false}
            value={car.plates}
            onChange={(event) => {
              const upperCaseValue = event.target.value.toUpperCase(); // Converte para maiúsculas
              handleFieldChange({ target: { name: 'plates', value: upperCaseValue } }); // Atualiza o estado
            }}
            render={(ref, props) => (
              <TextField
                {...props} // Passa as propriedades do MaskedInput
                inputRef={ref} // Ref necessário para integração com MaskedInput
                variant="outlined"
                name="plates"
                label="Placa"
                fullWidth
                required
                InputLabelProps={{
                  shrink: true, // Força o rótulo a sempre subir
                }}
              />
            )}
          />



          {/* PREÇO DE VENDA */}
          <NumericFormat
            value={car.selling_price}
            onValueChange={(values) => {
              const { value } = values; // `value` retorna o número bruto sem formatação
              handleFieldChange({ target: { name: 'selling_price', value } }); // Atualiza o estado com o número bruto
            }}
            thousandSeparator="."
            decimalSeparator=","
            prefix="R$ "
            fixedDecimalScale
            decimalScale={2} // Duas casas decimais
            customInput={TextField} // Usa TextField do Material-UI
            variant="outlined"
            name="selling_price"
            label="Preço de Venda"
            fullWidth
            required
          />




          {/*DATA DE VENDA*/}
          <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
            <DatePicker
              label="Data de Venda"
              value={car.selling_date ? new Date(car.selling_date) : null} // Certifica-se de que seja um Date válido
              onChange={(date) => {
                const formattedDate = date ? date.toISOString() : null; // Mantém o formato completo da data
                const event = { target: { name: 'selling_date', value: formattedDate } };
                handleFieldChange(event);
              }}
              slots={{ textField: (params) => <TextField {...params} variant="outlined" fullWidth helperText="Opcional" /> }}
            />
          </LocalizationProvider>







          {/*BOTÕES*/}
          <Box sx={{
            display: 'flex',
            justifyContent: 'space-around',
            width: '100%'
          }}>

            <Button
              variant="contained"
              color="secondary"
              type="submit"
            >
              Salvar
            </Button>



            <Button
              variant="outlined"
              onClick={handleBackButtonClick}
            >
              Voltar
            </Button>
          </Box>



          <Box sx={{
            fontFamily: 'monospace',
            display: 'flex',
            flexDirection: 'column',
            width: '100vw'
          }}>
            {JSON.stringify(car, null, ' ')}
          </Box>



        </form>
      </Box>

    </>
  )
}