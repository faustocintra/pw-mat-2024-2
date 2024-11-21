import React from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { ptBR } from "date-fns/locale/pt-BR";
import { parseISO } from "date-fns";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import InputMask from "react-input-mask";
import {
  feedbackWait,
  feedbackNotify,
  feedbackConfirm,
} from "../../ui/Feedback";
import { useNavigate, useParams } from "react-router-dom";
import { Checkbox, FormControlLabel } from "@mui/material";

export default function CarsForm() {
  const colors = [
    // Campo com chave e valor, basicamente fazendo o molde da tabela de cores
    { value: "AMARELO", label: "AMARELO" },
    { value: "AZUL", label: "AZUL" },
    { value: "BRANCO", label: "BRANCO" },
    { value: "CINZA", label: "CINZA" },
    { value: "DOURADO", label: "DOURADO" },
    { value: "LARANJA", label: "LARANJA" },
    { value: "MARROM", label: "MARROM" },
    { value: "PRETO", label: "PRETO" },
    { value: "ROSA", label: "ROSA" },
    { value: "ROXO", label: "ROXO" },
    { value: "VERDE", label: "VERDE" },
    { value: "VERMELHO", label: "VERMELHO" },
  ].sort(); // Ordena por ordem alfabetica

  const currentYear = new Date().getFullYear(); // Pega o ano atual
  const minYear = 1951; // Limita o ano minimo com base nas intruções
  const years = []; // Lista que vai conter todos os anos, do atual até o ano limite.
  let year = currentYear; // Variavel que recebe o ano atual
  while (year >= minYear) {
    // Looping que pega todos os anos entre o ano atual e o ano minimo
    years.push(year);
    year--;
  }

  const [imported, setImported] = React.useState(false);
  const handleImportedChange = (event) => {
    setImported(event.target.checked);
  };

  const plateMaskFormatChars = {
    // Mascara das placas, ele cria atribuições do que pode ser incluido em cada caracter
    9: "[0-9]", // somente numeros
    A: "[A-Z]", // Letras maiusculas de A a Z
    $: "[0-9A-J]", // numero de 0 a 9 ou uma letra de A até J
  };

  const formDefaults = {
    brand: "",
    model: "",
    color: "",
    year_manufacture: "",
    imported: "",
    plates: "",
    selling_price: "",
    selling_date: "",
  };

  const navigate = useNavigate();
  const params = useParams();

  const [state, setState] = React.useState({
    car: { ...formDefaults },
    formModified: false,
  });
  const { car, formModified } = state;

  // Se estivermos editando um cliente, precisamos carregar
  // seus dados assim que o componente for carregado
  React.useEffect(() => {
    // Sabemos que estamos editando (e não cadastrando um novo)
    // cliente quando a rota ativa contiver um parâmetro id
    if (params.id) loadData();
  }, []);

  async function loadData() {
    feedbackWait(true);
    try {
      const response = await fetch(
        import.meta.env.VITE_API_BASE + "/Cars/" + params.id
      );
      const result = await response.json();
      setState({ ...params, car: result });
    } catch (error) {
      console.log(error);
      feedbackNotify("ERRO: " + error.message, "error");
    } finally {
      feedbackWait(false);
    }
  }

  /*
    Preenche o campo do objeto car conforme
    o campo correspondente do formulário for
    modificado
  */
  function handleFieldChange(event) {
    // Vamos observar no console as informações que chegam
    // à função handleFieldChange
    console.log({ name: event.target.name, value: event.target.value });

    // Tira uma cópia da variável de estado car
    const carCopy = { ...car };
    // Altera em carCopy apenas o campo da vez
    carCopy[event.target.name] = event.target.value;
    // Atualiza a variável de estado, substituindo o objeto
    // car por sua cópia atualizada
    setState({ ...state, car: carCopy, formModified: true });
  }

  async function handleFormSubmit(event) {
    event.preventDefault(); // Impede o recarregamento da página

    feedbackWait(true);
    try {
      // Prepara as opções para o fetch
      const reqOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(car),
      };

      // Infoca o fetch para enviar os dados ao back-end.
      // Se houver parâmetro na rota, significa que estamos alterando
      // um registro existente e, portanto, o verbo precisa ser PUT
      if (params.id) {
        reqOptions.method = "PUT";
        await fetch(
          import.meta.env.VITE_API_BASE + "/cars/" + params.id,
          reqOptions
        );
      }
      // Senão, envia com o método POST para criar um novo registro
      else {
        await fetch(import.meta.env.VITE_API_BASE + "/cars", reqOptions);
      }

      feedbackNotify("Item salvo com sucesso.", "success", 4000, () => {
        // Retorna para a página de listagem
        navigate("..", { relative: "path", replace: true });
      });
    } catch (error) {
      console.log(error);
      feedbackNotify("ERRO: " + error.message, "error");
    } finally {
      feedbackWait(false);
    }
  }

  async function handleBackButtonClick() {
    if (
      formModified &&
      !(await feedbackConfirm(
        "Há informações não salvas. Deseja realmente voltar?"
      ))
    )
      return; // Sai da função sem fazer nada

    // Aqui o usuário respondeu que quer voltar e perder os dados
    navigate("..", { relative: "path", replace: true });
  }

  return (
    <>
      {/* gutterBottom coloca um espaçamento extra abaixo do componente */}
      <Typography variant="h1" gutterBottom>
        {params.id ? `Editar veiculo #${params.id}` : "Cadastrar novo veiculo"}
      </Typography>

      <Box className="form-fields">
        <form onSubmit={handleFormSubmit}>
          {/* autoFocus = foco do teclado no primeiro campo */}
          <TextField // Campo de marca, obrigatorio
            variant="outlined"
            name="brand"
            label="Marca do carro"
            fullWidth
            required
            autoFocus
            value={car.brand}
            onChange={handleFieldChange}
          />

          {/* autoFocus = foco do teclado no primeiro campo */}
          <TextField // Campo de modelo, obrigatorio
            variant="outlined"
            name="model"
            label="Modelo"
            fullWidth
            required
            value={car.model}
            onChange={handleFieldChange}
          />

          <TextField // Campo de cor, obrigatorio, em formato select, utilizando a estrutura criada anteriormente
            variant="outlined"
            name="color"
            label="Cor"
            fullWidth
            required
            value={car.color}
            select
            onChange={handleFieldChange}
          >
            {colors.map((s) => (
              <MenuItem key={s.value} value={s.value}>
                {s.label}
              </MenuItem>
            ))}
          </TextField>

          {/*
            O evento onChange do componente DatePicker não passa
            o parâmetro event, como no TextField, e sim a própria
            data que foi modificada. Por isso, ao chamar a função
            handleFieldChange no DatePicker, precisamos criar um
            parâmetro event "fake" com as informações necessárias
          */}

          <TextField // Campo de ano de fabricação, obrigatorio, em formato select, utilizando a lista de anos criada anteriormente
            variant="filled"
            name="year_manufacture"
            label="Ano de Fabricação"
            fullWidth
            select
            required
            value={car.year_manufacture}
            onChange={handleFieldChange}
          >
            {years.map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </TextField>

          <div className="MuiFormControl-root">
            <FormControlLabel // Classe mui utilizada para botão de importado
              control={
                <Checkbox
                  name="imported"
                  variant="filled"
                  value={(car.imported = imported)}
                  checked={imported}
                  onChange={handleImportedChange}
                  color="primary"
                />
              }
              label="Importado"
            />
          </div>

          <InputMask // Definição de formato de mascara para as placas, utilizando a formatação definida no inicio do codigo
            formatChars={plateMaskFormatChars}
            mask="AAA-9$99"
            value={car.plates}
            onChange={handleFieldChange}
          >
            {() => (
              <TextField
                variant="outlined"
                name="plates"
                label="Placa"
                fullWidth
                required
              />
            )}
          </InputMask>

          <TextField // Preço de venda, nao obrigatorio do tipo numero
            variant="outlined"
            name="selling_price"
            label="Preço de venda"
            type="number"
            fullWidth
            value={car.selling_price}
            onChange={handleFieldChange}
          />

          <LocalizationProvider
            dateAdapter={AdapterDateFns}
            adapterLocale={ptBR}
          >
            <DatePicker // Data de venda formatada no modelo ptBR, sem limitações até então por nao ter sido requisitado no trabalho
              label="Data de venda"
              value={car.selling_date ? new Date(car.selling_date) : null}
              slotProps={{
                textField: {
                  variant: "outlined",
                  fullWidth: true,
                },
              }}
              onChange={(date) => {
                const event = { target: { name: "selling_date", value: date } };
                handleFieldChange(event);
              }}
            />
          </LocalizationProvider>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              width: "100%",
            }}
          >
            <Button variant="contained" color="secondary" type="submit">
              Salvar
            </Button>

            <Button variant="outlined" onClick={handleBackButtonClick}>
              Voltar
            </Button>
          </Box>

          <Box
            sx={{
              fontFamily: "monospace",
              display: "flex",
              flexDirection: "column",
              width: "100vw",
            }}
          >
            {JSON.stringify(car, null, " ")}
          </Box>
        </form>
      </Box>
    </>
  );
}
