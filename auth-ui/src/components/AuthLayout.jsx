import authImg from "../assets/auth.jpg";

export default function AuthLayout({ children }) {
  return (
    <div className="auth-page">
      <div className="auth-container">
        {/* LEFT */}
        <div className="auth-left">
          <img src={authImg} alt="Gia phả dòng họ" />
          <h1>Gia phả dòng họ</h1>
          <p>Kết nối các thế hệ – Lưu giữ cội nguồn</p>
        </div>

        {/* RIGHT */}
        <div className="auth-right">
          {children}
        </div>
      </div>
    </div>
  );
}
