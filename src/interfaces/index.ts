// src/interfaces/index.ts

export interface Dependencia {
  id: number;
  nombre: string;
  url_facebook: string;
  pertenece_a: number;
  tipo: number;
  siglas: string;
  status: string;
}

export interface User {
  id: number;
  rol: number;
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  correo: string;
  url_facebook?: string; // Opcional para que pueda ser reutilizado en diferentes contextos
  pertenece_a?: number;   // Opcional para que pueda ser reutilizado en diferentes contextos
  tipo?: number;         // Opcional para que pueda ser reutilizado en diferentes contextos
  status?: string;       // Opcional para que pueda ser reutilizado en diferentes contextos
  siglas?: string;       // Opcional para que pueda ser reutilizado en diferentes contextos
}

export interface FormData {
  nombre: string;
  pagina_fb: string;
  siglas: string;
  status: string;
  pertenece_a: number;
  tipo: number;
}

export interface Publicacion {
  id: number;
  id_dependencia: number;
  contenido: string;
  fecha_publicacion: string;
  reacciones: number;
  compartidas: number;
  comentarios: number;
  tipo: string;
  url_imagen: string;
}

export interface SliderValue {
  min: number;
  max: number;
}

export interface Log {
  id: number;
  idUsuario: number;
  nombreUsuario?: string;
  accion: string;
  fecha: string;
}

export interface Usuario {
  id: number;
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  rol: number;
  correo: string;
  password: string;
  activo: string;
}