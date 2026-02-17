# Nimble Gravity - Job Application Challenge

Mini aplicación desarrollada en **React + TypeScript + Vite** que consume la API provista por Nimble Gravity para postularse a una posición.

---

## 🚀 Descripción

La aplicación permite:

- Ingresar un email para obtener los datos del candidato.
- Obtener y mostrar el listado de posiciones disponibles desde la API.
- Ingresar la URL del repositorio de GitHub.
- Enviar la postulación a una posición específica.
- Manejar estados de carga, éxito y error en la interfaz.

La aplicación interactúa con la API oficial del challenge utilizando requests GET y POST.

---

## 🛠️ Tecnologías utilizadas

- React
- TypeScript
- Vite
- Fetch API

---

## 📦 Instalación y ejecución

1. Clonar el repositorio:

```bash
git clone https://github.com/tu-usuario/tu-repo.git
```

2. Instalar dependencias:

```bash
npm install
```

3. Ejecutar el proyecto:

```bash
npm run dev
 ```

 La aplicación estará disponible en: http://localhost:5173

---

## 🔗 API utilizada

### BASE_URL

https://botfilter-h5ddh6dye8exb7ha.centralus-01.azurewebsites.net

### Endpoints utilizados

- `GET /api/candidate/get-by-email`
- `GET /api/jobs/get-list`
- `POST /api/candidate/apply-to-job`

---

## ✅ Funcionalidades implementadas

- Separación clara de componentes.
- Tipado fuerte con TypeScript.
- Manejo de errores de red y de respuestas de la API.
- Estados de carga y confirmación visual de aplicación exitosa.
- Configuración de alias para imports más limpios.

---

## 👤 Autor

**Lautaro Martin Sotelo**  
sotelo-martin@outlook.com
