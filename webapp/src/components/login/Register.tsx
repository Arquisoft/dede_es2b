import * as React from 'react';
import { useState } from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Navigate, Link } from "react-router-dom";
import { addUser, findUserByEmail, findUserByDni } from '../../api/api';
import { User } from '../../shared/shareddtypes';

const theme = createTheme();

export default function Register() {

  const [logueado, setLogueado] = useState("");
  const [errorMessage, setErrorMessage] = useState('');
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [idSolid, setIdSolid] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [dni, setDni] = useState("");
  const [foto, setFoto] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const user: User = {
      _id: "",
      nombre: nombre,
      apellidos: apellidos,
      idSolid: idSolid,
      dni: dni,
      email: email,
      contraseña: contraseña,
      esAdmin: false,
      foto: foto
    }
    let datos = await comprobarDatos(user)
    if (datos) {
      let log = await addUser(user);
      if (log) {
        setLogueado(email);
      }
    }
  };

  const emailLogueado = logueado || sessionStorage.getItem("usuario");

  if (emailLogueado) {
    return <Navigate to="/products" />;
  }

  async function comprobarDatos(user: User): Promise<boolean> {
    if (user.nombre.length === 0) {
      setErrorMessage("Error: El nombre no puede estar vacío");
      return false;
    }

    if (user.apellidos.length === 0) {
      setErrorMessage("Error: El nombre no puede estar vacío");
      return false;
    }

    if (user.dni.length === 0) {
      setErrorMessage("Error: El dni no puede estar vacío");
      return false;
    }

    if (user.dni.length !== 9) {
      setErrorMessage("Error: El dni debe contener 9 carácteres");
      return false;
    }

    if (JSON.stringify(await findUserByDni(user.dni)) !== "{}") {
      setErrorMessage("Error: El dni introducido ya existe");
      return false;
    }

    if (user.email.length === 0) {
      setErrorMessage("Error: El email no puede estar vacío");
      return false;
    }

    if ((JSON.stringify(await findUserByEmail(user.email)) !== "{}")) {
      setErrorMessage("Error: El email introducido ya existe");
      return false;
    }

    if (!(user.email.includes('@') && (user.email.endsWith('.com') || user.email.endsWith('.es')))) {
      setErrorMessage("Error: El formato del email no es válido");
      return false;
    }

    if (user.contraseña.length === 0) {
      setErrorMessage("Error: La contraseña no puede estar vacía");
      return false;
    }

    setErrorMessage('');
    return true;
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5" data-testid="h1Register">
            Registrarse
          </Typography>
          <Box component="form" name='registro' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="nombre"
              label="Nombre"
              name="nombre"
              autoFocus
              onChange={(e: any) => setNombre(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="apellidos"
              label="Apellidos"
              name="apellidos"
              autoFocus
              onChange={(e: any) => setApellidos(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="dni"
              label="DNI"
              name="dni"
              autoFocus
              onChange={(e: any) => setDni(e.target.value)}
            />
            <TextField
              margin="normal"
              fullWidth
              id="idSolid"
              label="Solid WebId"
              name="idSolid"
              autoFocus
              onChange={(e: any) => setIdSolid(e.target.value)}
            />
            <TextField
              margin="normal"
              fullWidth
              name="foto"
              label="Foto"
              id="foto"
              autoComplete="foto"
              onChange={(e: any) => setFoto(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e: any) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="contraseña"
              label="Contraseña"
              type="password"
              id="contraseña"
              autoComplete="current-contraseña"
              onChange={(e: any) => setContraseña(e.target.value)}
            />
            {errorMessage && (
              <p className="error"> {errorMessage} </p>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              id="registrarse"
              sx={{ mt: 3, mb: 2 }}
              data-testid="registrarse"
            >
              Registrarse
            </Button>
            <Grid container sx={{display:'flex', flexDirection:'column', alignContent:'center'}}>
              <Grid item>
                <Link to={"/login"}>
                  <Typography key="login" sx={{ my: 1, color: 'blue', textAlign: "center", display: 'block' }}>
                    Iniciar Sesión
                  </Typography>
                </Link>
              </Grid>
              <a href='https://solidcommunity.net/register'>¿No tienes cuenta en SOLID?</a>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}


