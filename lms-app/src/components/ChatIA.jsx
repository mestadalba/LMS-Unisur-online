import React from "react";

const ChatIA = ({ leccionId }) => {
  return (
    <div className="p-10 text-center">
      <h2 className="text-xl font-bold text-slate-700">🤖 Asistente de IA</h2>
      <p className="text-slate-500 mt-2">Próximamente podrás resolver tus dudas sobre la lección {leccionId}.</p>
    </div>
  );
};

export default ChatIA;