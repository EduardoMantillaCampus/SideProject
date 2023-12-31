import Swal from "sweetalert2";
import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import photo from "../../../assets/Img/Img26.jpg";
import "../../../assets/css/Contact.css";
import { useState } from "react";

export default function Contact() {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    empresa: "",
    correo: "",
    descripcion: "",
  });

  const [requiredFields, setRequiredFields] = useState([
    "nombre",
    "telefono",
    "empresa",
    "correo",
    "descripcion",
  ]);

  const sendDataFetch = async (dt) => {
    try {
      
      let options = {
        method: "POST",
        headers: new Headers({
            "Content-Type": "application/json"
        }),
        body: JSON.stringify(dt)
      }
      const sever = JSON.parse(import.meta.env.VITE_MY_SERVER);
      const response = await (
        await fetch(`http://${sever.host}:${sever.port}/contacto`, options)
      ).json();
        console.log(response);
      if (response.status !=200) {
        throw new Error("Error al enviar datos a la API");
      }
    } catch (e) {
      console.log("Error =>", e);
    }
  };
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));

    if (name === "telefono" && !/^\d+$/.test(value)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "El teléfono debe contener solo números",
      }));
    } else {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: "",
      }));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newErrors = {};
    requiredFields.forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = "Este campo es obligatorio";
      } else if (field === "correo") {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData[field])) {
          newErrors[field] =
            "Por favor, ingrese una dirección de correo electrónico válida.";
        }
      } else if (field === "telefono" && !/^\d+$/.test(formData[field])) {
        newErrors[field] = "El teléfono debe contener solo números";
      }
    });
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    sendDataFetch(formData);

    setFormData({
      nombre: "",
      telefono: "",
      empresa: "",
      correo: "",
      descripcion: "",
    });

    Swal.fire({
      icon: "success",
      title: "Datos enviados con exito!!",
      position: "bottom-end",
      width: "20rem",
      timer: 5000,
      toast: true,
      timerProgressBar: true,
      showConfirmButton: false,
    });
  };
  return (
    <Box
      data-aos="fade-right"
      id="contact"
      sx={{ background: "#34495E", width: "100%", minHeight: "400px" }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            width: { xs: "100%", md: "500px", lg: "600px" },
            height: { xs: "150px", sm: "250px", md: "auto" },
          }}
        >
          <img
            src={photo}
            alt="Hola"
            width="100%"
            height="100%"
            style={{ objectFit: "cover", objectPosition: "top" }}
          />
        </Box>
        <Box
          sx={{
            padding: "30px 20px",
            width: { xs: "100%", sm: "100%", md: "500px", lg: "600px" },
            color: "#fff",
          }}
        >
          <Typography
            variant="h5"
            sx={{ fontWeight: 600, textAlign: "center", color: "#fff" }}
          >
            Permitenos contactarte
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid
              container
              spacing={2}
            >
              <Grid
                item
                xs={12}
                sm={6}
              >
                <TextField
                  name="nombre"
                  label="Nombre"
                  variant="standard"
                  value={formData.nombre}
                  fullWidth
                  margin="normal"
                  sx={{
                    "& .MuiInputLabel-root": { color: "#fff" },
                    "& .MuiInputBase-input": {
                      color: "#d1d1d1",
                    },
                  }}
                  onChange={handleChange}
                />
                {errors.nombre && (
                  <Typography
                    variant="caption"
                    color="error"
                  >
                    {errors.nombre}
                  </Typography>
                )}
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
              >
                <TextField
                  name="telefono"
                  label="Teléfono"
                  variant="standard"
                  value={formData.telefono}
                  fullWidth
                  margin="normal"
                  type="tel"
                  sx={{
                    width: "100%",
                    "& .MuiInputLabel-root": { color: "#fff" },
                    "& .MuiInputBase-input": {
                      color: "#d1d1d1",
                    },
                  }}
                  onChange={handleChange}
                />
                {errors.telefono && (
                  <Typography
                    variant="caption"
                    value={formData.telefono}
                    color="error"
                  >
                    {errors.telefono}
                  </Typography>
                )}
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
              >
                <TextField
                  name="empresa"
                  label="Empresa"
                  variant="standard"
                  value={formData.empresa}
                  fullWidth
                  margin="normal"
                  sx={{
                    width: "100%",
                    "& .MuiInputLabel-root": { color: "#fff" },
                    "& .MuiInputBase-input": {
                      color: "#d1d1d1",
                    },
                  }}
                  onChange={handleChange}
                />
                {errors.empresa && (
                  <Typography
                    variant="caption"
                    color="error"
                  >
                    {errors.empresa}
                  </Typography>
                )}
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
              >
                <TextField
                  name="correo"
                  label="Correo Electrónico"
                  variant="standard"
                  value={formData.correo}
                  fullWidth
                  margin="normal"
                  sx={{
                    width: "100%",
                    "& .MuiInputLabel-root": { color: "#fff" },
                    "& .MuiInputBase-input": {
                      color: "#d1d1d1",
                    },
                  }}
                  onChange={handleChange}
                />
                {errors.correo && (
                  <Typography
                    variant="caption"
                    color="error"
                  >
                    {errors.correo}
                  </Typography>
                )}
              </Grid>
              <Grid
                item
                xs={12}
              >
                <TextField
                  name="descripcion"
                  label="Describa su necesidad"
                  variant="outlined"
                  value={formData.descripcion}
                  fullWidth
                  multiline
                  rows={4}
                  margin="normal"
                  sx={{
                    width: "100%",
                    "& .MuiInputLabel-root": { color: "#fff" },
                    "& .MuiInputBase-input": {
                      color: "#d1d1d1",
                    },
                  }}
                  onChange={handleChange}
                />
                {errors.descripcion && (
                  <Typography
                    variant="caption"
                    color="error"
                  >
                    {errors.descripcion}
                  </Typography>
                )}
              </Grid>
              <Grid
                item
                xs={12}
                sx={{ display: "flex", justifyContent: "center" }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  sx={{
                    width: "150px",
                    mt: 2,
                    background: "#ECA401",
                    "&:hover": { background: "#FBAE00" },
                  }}
                >
                  Go For It
                </Button>
              </Grid>
            </Grid>
          </form>
        </Box>
      </Box>
    </Box>
  );
}
