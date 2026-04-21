import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
// Importamos el SDK de Google directamente desde un CDN compatible con Deno
import { GoogleGenerativeAI } from "https://esm.run/@google/generative-ai"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req: Request) => {
  // Manejo de CORS
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    const { query } = await req.json();
    const apiKey = Deno.env.get('GEMINI_API_KEY');

    if (!apiKey) throw new Error("Falta la GEMINI_API_KEY en los secretos.");

    // 1. Inicializamos el SDK con tu llave
    const genAI = new GoogleGenerativeAI(apiKey);

    // 2. Configuramos el modelo (usando la versión estable que Google recomienda)
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // 3. Generamos el contenido
    const result = await model.generateContent(query);
    const response = await result.response;
    const text = response.text();

    return new Response(JSON.stringify({ answer: text }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (err: any) {
    return new Response(JSON.stringify({ 
      error: "Error en la ejecución", 
      detalle: err.message 
    }), { status: 200, headers: corsHeaders });
  }
})