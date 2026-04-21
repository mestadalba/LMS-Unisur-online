import { serve } from "https://deno.land/std@0.177.0/http/server.ts"
import { GoogleGenerativeAI } from "https://esm.sh/@google/generative-ai@0.21.0"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req: Request) => {
  // 1. Manejo de Preflight (CORS) - Siempre al inicio
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    // 2. Extraer datos del Body
    const { query, context } = await req.json();
    const apiKey = Deno.env.get('GEMINI_API_KEY');

    if (!apiKey) {throw new Error("Falta la configuración de GEMINI_API_KEY en los secretos de Supabase.");}
    
    // --- CONFIGURACIÓN DE TU URL ---
    // Cambia esto por la URL real de tu Dashboard donde se ven los cursos
    const BASE_URL = "https://tae-lms-unisur-online.vercel.app/courses";

    // 3. Procesar el catálogo de cursos (Contexto)
    // Lo hacemos AQUÍ, después de recibir el 'context' del req.json()
    // Cambia tu bloque de procesamiento por este que es más robusto:
    let catalogoTexto = "No hay cursos disponibles actualmente.";

    if (context && Array.isArray(context)) {
      catalogoTexto = context.map((curso: any) => {
        // Forzamos la lectura incluso si las llaves vienen distintas
        const t = (curso.title || curso.Title || "Sin Título").trim();
        const d = (curso.description || curso.Description || "Sin Descripción").trim();
        const id = curso.id;
        
        return `- CURSO: "${t}" | DETALLE: ${d} | LINK: ${BASE_URL}/${id}`;
      }).join('\n');
    }
    console.log("Catálogo procesado para la IA:", catalogoTexto); // Revisa esto en los logs de Supabase

    // 4. Configurar IA
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-3-flash-preview" });

    // 5. Iniciar Chat con Instrucciones Híbridas
    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: `Actúa como un experto de TAE (Taller de Actualización Empresarial). 
          
          CATÁLOGO INTERNO (Prioridad):
          ${catalogoTexto}
          
          REGLAS:
          1. Si preguntan por un curso de la lista, descríbelo usando el 'DETALLE' proporcionado.
          2. Si preguntan algo general (contabilidad, fiscal, IA), responde usando tu conocimiento experto.
          3. Responde siempre en ESPAÑOL profesional.
          4. No inventes otros significados para la palabra "TAE".` }],
        },
        {
          role: "model",
          parts: [{ text: "Entendido. Soy el asistente de TAE. Responderé basándome en el catálogo de cursos y en mi conocimiento general para ayudarte. ¿Qué deseas consultar?" }],
        },
      ],
    });

    const promptText = typeof query === 'string' ? query.trim() : "";
    if (!promptText) throw new Error("La consulta está vacía.");

    // 6. Enviar mensaje y responder
    const result = await chat.sendMessage(promptText);
    const response = await result.response;
    const text = response.text();

    return new Response(JSON.stringify({ answer: text }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  
  } catch (err: any) {
    console.error("Error en Edge Function:", err.message);
    
    return new Response(
      JSON.stringify({ 
        error: "Error en la ejecución de la IA", 
        detalle: err.message 
      }), 
      { 
        status: 200, // Mantenemos 200 para que el frontend maneje el mensaje de error suavemente
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  }
})