import { NextResponse } from "next/server";
import { FRAGRANCES, TREATMENT_PACKS } from "@/data/fragrances";

export async function POST(req: Request) {
  try {
    const { query } = await req.json();

    if (!query || typeof query !== "string") {
      return NextResponse.json(
        { error: "Consulta inválida" },
        { status: 400 }
      );
    }

    const lowerQuery = query.toLowerCase();

    // Check if GEMINI_API_KEY is present
    const apiKey = process.env.GEMINI_API_KEY;

    if (apiKey) {
      try {
        const prompt = `Você é o Sommelier de Aromas e Mestre em Aromaterapia da Mathura (marca de incensos 100% naturais, sem carvão, sem pólvora, com madeira de reflorestamento e pet-friendly).
O usuário descreveu a seguinte necessidade ou sintoma: "${query}".

Catálogo de Fragrâncias disponíveis:
${FRAGRANCES.map(
  (f) => `- ID: ${f.id} | Nome: ${f.name} | Família: ${f.family} | Benefícios: ${f.benefits.join(", ")} | Intenções: ${f.intentions.join(", ")}`
).join("\n")}

Responda em formato JSON com exatamente este esquema:
{
  "diagnosis": "Diagnóstico acolhedor em 1 ou 2 frases sobre como o kit aromático atua e auxilia no bem-estar do ambiente",
  "recommendedFragranceIds": ["id1", "id2", "id3", "id4", "id5"],
  "prescription": "Como e quando acender as varetas durante a semana (ex: 2x na semana, queima de 1h)",
  "affirmation": "Uma frase de intenção ou mantra positivo para o momento de bem-estar"
}
Retorne APENAS o JSON puro, sem crases de markdown. Não use as palavras ritual ou terapia, use tratamento, kit, cuidado ou harmonização.`;

        const response = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [{ parts: [{ text: prompt }] }],
              generationConfig: { responseMimeType: "application/json" },
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          const rawText = data.candidates?.[0]?.content?.parts?.[0]?.text;
          if (rawText) {
            const parsed = JSON.parse(rawText);
            return NextResponse.json(parsed);
          }
        }
      } catch (err) {
        console.error("Gemini API call failed, falling back to local heuristic", err);
      }
    }

    // High-performance intelligent local semantic matcher
    let matchedTreatment = TREATMENT_PACKS[0]; // default descarrego

    if (lowerQuery.includes("foco") || lowerQuery.includes("estudo") || lowerQuery.includes("concentra") || lowerQuery.includes("trabalho") || lowerQuery.includes("produtiv")) {
      matchedTreatment = TREATMENT_PACKS.find((r) => r.intention === "foco") || TREATMENT_PACKS[1];
    } else if (lowerQuery.includes("sono") || lowerQuery.includes("dormir") || lowerQuery.includes("relax") || lowerQuery.includes("ansied") || lowerQuery.includes("calm")) {
      matchedTreatment = TREATMENT_PACKS.find((r) => r.intention === "relaxamento") || TREATMENT_PACKS[2];
    } else if (lowerQuery.includes("dinheiro") || lowerQuery.includes("prosper") || lowerQuery.includes("fartura") || lowerQuery.includes("negocio") || lowerQuery.includes("sucesso")) {
      matchedTreatment = TREATMENT_PACKS.find((r) => r.intention === "prosperidade") || TREATMENT_PACKS[3];
    } else {
      matchedTreatment = TREATMENT_PACKS[0]; // Descarrego e proteção
    }

    return NextResponse.json({
      diagnosis: `Identificamos que seu espaço será muito beneficiado pelo ${matchedTreatment.title.toLowerCase()}. As notas botânicas puras da Mathura atuam restaurando a harmonia, dissipando tensões e auxiliando no equilíbrio da energia vital.`,
      recommendedFragranceIds: matchedTreatment.recommendedFragranceIds,
      prescription: matchedTreatment.prescription.frequency + ". " + matchedTreatment.prescription.schedule,
      affirmation: "Que este aroma natural purifique o ar, acolha os pensamentos e sele a serenidade no meu lar.",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Falha ao processar consultoria" },
      { status: 500 }
    );
  }
}
