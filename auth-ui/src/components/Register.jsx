import { useState } from "react";
import { families } from "../data/families";

export default function Register({ switchToLogin }) {
  const [form, setForm] = useState({
    fullName: "",
    username: "",
    email: "",
    parent_family_id: "",
    password: "",
    confirmPassword: "",
    gender: "",
    address: "",
    bio: ""
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(form);
    alert("Register (chưa API)");
  };

  return (
    <div className="auth-card auth-card-large">
      <h2 className="auth-title">Đăng kí tài khoản</h2>

      <form className="form-grid" onSubmit={handleSubmit}>
        <input
          name="fullName"
          placeholder="Họ và tên"
          value={form.fullName}
          onChange={handleChange}
        />

        <input
          name="username"
          placeholder="Tên đăng nhập"
          value={form.username}
          onChange={handleChange}
        />

        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />

        <select
          name="parent_family_id"
          value={form.parent_family_id}
          onChange={handleChange}
        >
          <option value="">Chọn bố mẹ</option>
          {families.map((f) => (
            <option key={f.id} value={f.id}>
              {f.father_name} & {f.mother_name}
            </option>
          ))}
        </select>

        {/* Địa chỉ */}
        <input
          name="address"
          placeholder="Địa chỉ"
          value={form.address}
          onChange={handleChange}
        />

        {/* Giới tính */}
        <select
          name="gender"
          value={form.gender}
          onChange={handleChange}
        >
          <option value="">Giới tính</option>
          <option value="Male">Nam</option>
          <option value="Female">Nữ</option>
          <option value="Other">Khác</option>
        </select>

        <input
          type="password"
          name="password"
          placeholder="Mật khẩu"
          value={form.password}
          onChange={handleChange}
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Xác nhận mật khẩu"
          value={form.confirmPassword}
          onChange={handleChange}
        />

        {/* BIO full hàng */}
        <textarea
          name="bio"
          placeholder="Giới thiệu ngắn (bio)"
          className="full-row bio"
          value={form.bio}
          onChange={handleChange}
        />

        <button type="submit" className="auth-button full-row">
          Register
        </button>
      </form>

      <p className="switch-text">
        Bạn đã có tài khoản rồi?{" "}
        <span onClick={switchToLogin}>Đăng nhập</span>
      </p>
    </div>
  );
}
