export type Category = "Todos" | "Producto" | "Comercial" | "Social" | "Eventos";
export type Project = {
  title: string;
  category: Exclude<Category, "Todos">;
  client: string;
  description: string;
  image: string;
  video: string;
  legacyVideo: string;
};
const origin = "https://snazzy-manatee-de4ef3.netlify.app/videos/projects/";
export const projects: Project[] = [
  { title: "Extractor de jugo", category: "Producto", client: "Producto · Video comercial", description: "Texturas, detalles y movimiento para convertir un producto cotidiano en el centro de atención.", image: "/images/covers/extractor-de-jugo.png", video: "/videos/projects/extractor-de-jugo.mp4", legacyVideo: origin+"Extraxtor%20de%20Jugo.mp4" },
  { title: "Camargo Fix Financiado", category: "Comercial", client: "Retail · Comunicación de producto", description: "Una propuesta dinámica que presenta el producto y comunica su valor de forma clara.", image: "/images/covers/camargo-fix-financiado.png", video: "/videos/projects/camargo-fix-financiado.mp4", legacyVideo: origin+"Camargo%20Fix%20Financiado.mp4" },
  { title: "Alejandro Direccionario", category: "Comercial", client: "Contenido de marca", description: "Una historia breve que conecta identidad, mensaje y una puesta en escena memorable.", image: "/images/covers/alejandro-direccionario.png", video: "/videos/projects/alejandro-direccionario.mp4", legacyVideo: origin+"Alejandro%20Direccionario.mp4" },
  { title: "Semana Rosa", category: "Social", client: "Campaña · Reels", description: "Una campaña con ritmo y personalidad para conectar con el público en redes sociales.", image: "/images/covers/reels-semana-rosa.png", video: "/videos/projects/reels-semana-rosa.mp4", legacyVideo: origin+"reels%20semana%20rosa.mp4" },
  { title: "Noticias, primera semana", category: "Social", client: "Comunicación digital", description: "Información contada con claridad, ritmo y recursos visuales que mantienen el interés.", image: "/images/covers/noticias-1era-semana-marzo.png", video: "/videos/projects/noticias-marzo.mp4", legacyVideo: origin+"Noticias%201era%20Semana%20Marzo.mp4" },
  { title: "Recap aniversario", category: "Eventos", client: "Cobertura · Experiencia de marca", description: "Los mejores momentos, la energía y los detalles que hacen recordar una experiencia de marca.", image: "/images/covers/recap-aniversario.png", video: "/videos/projects/recap-aniversario.mp4", legacyVideo: origin+"Recap%20Aniversario.mp4" },
];
export const filters: Category[] = ["Todos", "Producto", "Comercial", "Social", "Eventos"];
export const documentary = {
  title: "Venezuela a través del movimiento",
  description: "Documental estudiantil sobre cultura e identidad venezolana a través de la danza y la expresión humana. Edición y postproducción: Laura España.",
  youtubeId: "fJoyTOyoWeI",
  watchUrl: "https://www.youtube.com/watch?v=fJoyTOyoWeI"
};
