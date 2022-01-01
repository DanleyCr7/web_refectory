import React, { useState } from "react";
import MaterialTable from "material-table";
import { ThemeProvider } from "@material-ui/styles";
import api from "../../services/api";
import { createMuiTheme } from "@material-ui/core";
import Snackbar from "../../components/snackbar";

import { createBrowserHistory } from 'history';

export const NutriTable = ({ nutricionistas, apiData, title }) => {
  const history = createBrowserHistory();
  const [helperText, setHelperText] = useState({
    resp: "",
    message: "",
  });
  const [open, setOpen] = useState(false);
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: "#2AB083",
      },
      secondary: {
        main: "#333",
      },
    },
  });

  const deleteNutri = async (event, rowData) => {
    rowData.map((row) => {
      api
        .delete(`/admin/delete/${row._id}`)
        .then(() => {
          setOpen(true);
          setHelperText({
            message: `Nutricionista deletado com sucesso :)`,
            resp: "success",
          });
          apiData();
        })
        .catch((error) => {
          setOpen(true);
          setHelperText({
            message: `Ops, aconteceu algum erro :(`,
            resp: "error",
          });
        });
    });
  };

  const editNutri = async (event, rowData) => {
    const id = rowData[0]._id;
    history.push(`/nutri/edit/${id}`);
  };

  return (
    <>
      <Snackbar
        open={open}
        setOpen={setOpen}
        variant={helperText.resp}
        msg={helperText.message}
      />
      <ThemeProvider theme={theme}>
        <MaterialTable
          title={title}
          columns={[
            { title: "NOME", field: "name", filtering: false },
            { title: "Email", field: "email", filtering: false },
            { title: "Telefone", field: "phone", filtering: false },
            { title: "Cidade", field: "city", filtering: false },
            { title: "Estado", field: "state", filtering: false },
            { title: "Cpf", field: "cpf", filtering: false },
          ]}
          data={nutricionistas}
          actions={[
            {
              icon: "delete",
              tooltip: "Deletar nutricista",
              onClick: deleteNutri,
            },
            {
              icon: "edit",
              tooltip: "Editar nutricista",
              onClick: editNutri,
            },
          ]}
          options={{
            selection: true,
            filtering: true,
            selectionProps: (rowData) => ({
              color: "primary",
            }),
            headerStyle: {
              backgroundColor: "#2FA23B",
              color: "#eee",
              fontSize: "1em",
            },
          }}
        />
      </ThemeProvider>
    </>
  );
};
