// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}", // Dòng quan trọng nhất: Quét tất cả file trong thư mục src
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }








/** @type {import('tailwindcss').Config} */
import plugin from 'tailwindcss/plugin';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    plugin(function({ addComponents, theme }) {
      addComponents({
        '.tree ul': {
          paddingTop: '20px',
          position: 'relative',
          transition: 'all 0.5s',
          display: 'flex',
          justifyContent: 'center',
        },
        '.tree li': {
          float: 'left',
          textAlign: 'center',
          listStyleType: 'none',
          position: 'relative',
          padding: '20px 5px 0 5px',
          transition: 'all 0.5s',
        },
        // Vẽ đường dọc (trên) và ngang (một nửa)
        '.tree li::before, .tree li::after': {
          content: '""',
          position: 'absolute',
          top: '0',
          right: '50%',
          borderTop: '1px solid #ccc',
          width: '50%',
          height: '20px',
        },
        '.tree li::after': {
          right: 'auto',
          left: '50%',
          borderLeft: '1px solid #ccc',
        },
        // Xóa đường nối thừa ở node đầu và cuối
        '.tree li:only-child::after, .tree li:only-child::before': {
          display: 'none',
        },
        '.tree li:only-child': {
          paddingTop: '0',
        },
        '.tree li:first-child::before, .tree li:last-child::after': {
          border: '0 none',
        },
        // Bo góc cho đường nối
        '.tree li:last-child::before': {
          borderRight: '1px solid #ccc',
          borderRadius: '0 5px 0 0',
        },
        '.tree li:first-child::after': {
          borderRadius: '5px 0 0 0',
        },
        // Đường dọc nối từ node cha xuống danh sách con
        '.tree ul ul::before': {
          content: '""',
          position: 'absolute',
          top: '0',
          left: '50%',
          borderLeft: '1px solid #ccc',
          width: '0',
          height: '20px',
        },
      })
    })
  ],
}