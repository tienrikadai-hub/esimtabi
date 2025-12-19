
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';

const rootElement = document.getElementById('root');

if (!rootElement) {
  console.error("Không tìm thấy phần tử root!");
} else {
  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  } catch (err) {
    console.error("Lỗi khi khởi tạo React:", err);
    rootElement.innerHTML = `<div style="padding:40px; color:red; font-family:sans-serif;">
      <h2>Lỗi khởi động ứng dụng</h2>
      <p>${err instanceof Error ? err.message : String(err)}</p>
    </div>`;
  }
}
