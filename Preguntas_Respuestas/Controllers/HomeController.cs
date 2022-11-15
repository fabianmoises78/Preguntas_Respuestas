using Preguntas_Respuestas.DTO;
using Preguntas_Respuestas.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;

namespace Preguntas_Respuestas.Controllers
{
    public class HomeController : Controller
    {
        Datos conexion = new Datos();
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Logout()
        {
            Session.Abandon();
            return RedirectToAction("Index");
        }

        public ActionResult Registro()
        {
            return View();
        }

        public JsonResult RegistrarUsuario(USUARIO entity)
        {
            GenericDTO response = new GenericDTO();

            try
            {
                var result = conexion.USUARIOEXISTE(entity.USUARIO1);
                if (result.Count() >= 1)
                {
                    response.Status = 0;
                    response.Message = "El Usuario ya existe...";
                    return Json(response);
                }
                else
                {
                    if (entity.NOMBRE != null && entity.USUARIO1 != null && entity.CONTRASEÑA != null)
                    {
                        conexion.CREARUSUARIO(entity.NOMBRE, entity.USUARIO1, entity.CONTRASEÑA);
                        response.Status = 1;
                        response.Message = "Usuario registrado con exito.";
                        return Json(response);
                    }
                    else
                    {
                        response.Status = 0;
                        response.Message = "Los datos no pueden ir vacios...";
                        return Json(response);
                    }
                }

            }
            catch (Exception ex)
            {
                response.Status = 0;
                response.Message = "Un error ha ocurrido " + ex;
                return Json(response);
            }
        }

        public JsonResult Login(USUARIO entity)
        {
            GenericDTO response = new GenericDTO();

            try
            {
                List<LOGINUSUARIO_Result> Loginuser = conexion.LOGINUSUARIO(entity.USUARIO1, entity.CONTRASEÑA).ToList();

                if (Loginuser.Count > 0)
                {
                    response.Status = 1;
                    response.Message = "Bienvenido!";

                    Session["Status"] = "true";
                    Session["ID_USUARIO"] = Loginuser[0].ID_USUARIO;
                    Session["USUARIO"] = Loginuser[0].USUARIO;
                    Session["NOMBRE"] = Loginuser[0].NOMBRE;

                    return Json(response);
                }
                else
                {
                    response.Status = 0;
                    response.Message = "El usuario o contraseña son invalidos.";

                    Session["Status"] = "true";
                    Session["ID_USUARIO"] = "";
                    Session["USUARIO"] = "";
                    Session["NOMBRE"] = "";

                    return Json(response);
                }

            }
            catch (Exception ex)
            {
                response.Status = 0;
                response.Message = "Error " + ex;
                return Json(response);
            }
        }

        public ActionResult Inicio()
        {
            return View();
        }

        public ActionResult CrearPregunta(PREGUNTAS entity)
        {
            GenericDTO response = new GenericDTO();
            var sesion = Convert.ToInt32(Session["ID_USUARIO"]);

            try
            {
                if (sesion > 0)
                {
                    if (entity.PREGUNTA != null)
                    {
                        var Id_usuario = Convert.ToInt32(Session["ID_USUARIO"]);
                        conexion.CREARPREGUNTA(entity.PREGUNTA, Id_usuario);
                        response.Status = 1;
                        response.Message = "Pregunta registrada con exito!";
                        return Json(response);
                    }
                    else
                    {
                        response.Status = 0;
                        response.Message = "Datos vacios...";
                        return Json(response);
                    }
                }
                else
                {
                    response.Status = 0;
                    response.Message = "Inicia Sesión para realizar una pregunta";
                    return Json(response);
                }
            }
            catch (Exception ex)
            {
                response.Status = 0;
                response.Message = "Un error ha ocurrido... " + ex;
                return Json(response);
            }
        }

        public JsonResult ListarPreguntas()
        {
            List<LISTARPREGUNTAS_Result> ListarPreguntas = new List<LISTARPREGUNTAS_Result>();

            using (conexion)
            {
                var ListPreguntas = conexion.LISTARPREGUNTAS();

                foreach (var item in ListPreguntas)
                {
                    var asignar = new LISTARPREGUNTAS_Result()
                    {

                        ID_PREGUN = item.ID_PREGUN,
                        PREGUNTA = item.PREGUNTA,
                        ID_USUARIO = item.ID_USUARIO,
                        USUARIO = item.USUARIO,
                        ID_ESTADO = item.ID_ESTADO,
                        NOMBRE_ESTADO = item.NOMBRE_ESTADO
                    };
                    ListarPreguntas.Add(asignar);
                }
            }
            return Json(ListarPreguntas);
        }

        public JsonResult CrearRespuesta(RESPUESTAS entity)
        {
            GenericDTO response = new GenericDTO();
            var id_user = Convert.ToInt32(Session["ID_USUARIO"]);
            try
            {
                if (id_user > 0)
                {
                    if (entity.RESPUESTA != null)
                    {
                        conexion.CREARRESPUESTA(entity.RESPUESTA, id_user, entity.ID_PREGUN);
                        response.Status = 1;
                        response.Message = "Repuesta registrada con exito!";
                        return Json(response);
                    }
                    else
                    {
                        response.Status = 0;
                        response.Message = "Datos Vacios....!";
                        return Json(response);
                    }
                }
                else
                {
                    response.Status = 0;
                    response.Message = "Inicia Sesión para responder.";
                    return Json(response);
                }
                
            }
            catch (Exception ex)
            {
                response.Status = 0;
                response.Message = "Un problema ha ocurrido " + ex;
                return Json(response);
            }
        }

        public ActionResult VerPregunta()
        {
            return View();
        }

        public JsonResult LisPreRespuesta(RESPUESTAS entity)
        {
            List<LISTARRESPUESTAS_Result> ListarRespuestas = new List<LISTARRESPUESTAS_Result>();

            using (conexion)
            {
                var Listrespuestas = conexion.LISTARRESPUESTAS(entity.ID_PREGUN);
                foreach (var item in Listrespuestas)
                {
                    var asignar = new LISTARRESPUESTAS_Result()
                    {
                        RESPUESTA = item.RESPUESTA,
                        ID_RESP = item.ID_RESP,
                        PREGUNTA = item.PREGUNTA,
                        ID_PREGUN = item.ID_PREGUN,
                        NOMBRE = item.NOMBRE
                    };
                    ListarRespuestas.Add(asignar);
                }
            }
            return Json(ListarRespuestas);
        }

        public JsonResult LisPreguntabyID(PREGUNTAS entity)
        {
            List<PREGUNTABYID_Result> ListarPregunta = new List<PREGUNTABYID_Result>();

            using (conexion)
            {
                var Listrespuestas = conexion.PREGUNTABYID(entity.ID_PREGUN);
                foreach (var item in Listrespuestas)
                {
                    var asignar = new PREGUNTABYID_Result()
                    {
                        ID_PREGUN = item.ID_PREGUN,
                        PREGUNTA = item.PREGUNTA,
                        ID_USUARIO = item.ID_USUARIO,
                        USUARIO = item.USUARIO,
                        NOMBRE_ESTADO = item.NOMBRE_ESTADO,
                        ID_ESTADO = item.ID_ESTADO
                    };
                    ListarPregunta.Add(asignar);
                }
            }
            return Json(ListarPregunta);
        }

        public ActionResult myquestions()
        {
            return View();
        }

        public JsonResult MisPreguntas()
        {
            List<PREGUNTASBYUSER_Result> PreguntasbyUser = new List<PREGUNTASBYUSER_Result>();
            var id_user = Convert.ToInt32(Session["ID_USUARIO"]);

            using (conexion)
            {
                var lkistarPregunbyuser = conexion.PREGUNTASBYUSER(id_user);
                foreach (var item in lkistarPregunbyuser)
                {
                    var asignar = new PREGUNTASBYUSER_Result()
                    {
                        ID_PREGUN = item.ID_PREGUN,
                        PREGUNTA = item.PREGUNTA,
                        NOMBRE_ESTADO = item.NOMBRE_ESTADO
                    };
                    PreguntasbyUser.Add(asignar);
                }
            }
            return Json(PreguntasbyUser);
        }

        public JsonResult ActDesacPregunta(PREGUNTAS entity)
        {
            GenericDTO response = new GenericDTO();

            try
            {
                conexion.DESACTIVARPREGUNTA(entity.ID_PREGUN, entity.ID_ESTADO);
                if (entity.ID_ESTADO == 1)
                {
                    response.Message = "Pregunta Desactivada.";
                    response.Status = 1;
                }
                else if (entity.ID_ESTADO == 2)
                {
                    response.Message = "Pregunta Activada.";
                    response.Status = 1;
                }
                return Json(response);
            }
            catch
            {
                response.Message = "Un error ha ocurrido.";
                response.Status = 0;
                return Json(response);
            }
        }
    }
}