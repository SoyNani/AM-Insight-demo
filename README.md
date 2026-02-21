# 🚀Data Insight

Dashboard que simula el funcionamiento de una herramienta de análisis para vendedores que hacen **dropshipping** en MercadoLibre. Permite visualizar métricas clave, gestionar productos y simular márgenes de ganancia en tiempo real.

**Demo en producción:**  
https://insight-demo-six.vercel.app/dashboard

---

## 📌 Descripción del Proyecto

Data Insight es una aplicación frontend construida con **Next.js 16** y **React 19** que consume la API pública FakeStore API para simular un entorno real de e-commerce.

Incluye:

- **Dashboard principal**  
  Métricas de negocio (productos activos, margen promedio, ingresos estimados, tasa de conversión) con gráficos interactivos de líneas y barras.

- **Simulador de márgenes**  
  Calculadora en tiempo real donde el vendedor ingresa precio de compra, precio de venta, costos de envío y comisión para obtener su margen neto con feedback visual.

- **Gestión de productos**  
  Tabla con búsqueda, filtrado por estado (activo, alerta, sincronizado), imágenes de producto y acciones de eliminación.

- **Modo oscuro/claro**  
  Toggle de tema persistente con transiciones suaves.

- **Responsive design**  
  Sidebar colapsable con soporte completo para dispositivos móviles.

---

# 🧠 Arquitectura: Atomic Design

El proyecto sigue los principios de **Atomic Design** de Brad Frost, organizando los componentes en niveles de complejidad creciente. Esto garantiza **reutilizabilidad**, **consistencia visual** y **mantenibilidad** a largo plazo.

---

## 🔎 Principios aplicados

| Principio | Descripción |
|------------|------------|
| **Single Responsibility** | Cada componente tiene una única responsabilidad bien definida |
| **Composición sobre herencia** | Los componentes complejos se construyen combinando componentes simples |
| **Props tipadas** | Todas las interfaces están definidas con TypeScript estricto |
| **Separación de concerns** | Lógica de negocio, presentación y datos están separados |

---

## 🏗 Niveles de la arquitectura

```plaintext
src/
├── components/
│   ├── atoms/           # Nivel 1 - Elementos fundamentales e indivisibles
│   ├── molecules/       # Nivel 2 - Combinaciones de átomos con funcionalidad
│   ├── organisms/       # Nivel 3 - Secciones completas de la interfaz
│   └── providers/       # Contextos globales (tema, autenticación)
├── actions/             # Funciones de consumo de API REST
├── hooks/               # Custom hooks con SWR para data fetching
├── lib/                 # Utilidades y cliente HTTP genérico
├── types/               # Tipos TypeScript centralizados
└── app/                 # Rutas de Next.js (App Router)
```

---

## 🧩 Atoms (Átomos)

Los átomos son los **bloques de construcción más básicos** de la interfaz. No dependen de ningún otro componente del proyecto y son completamente reutilizables.

```plaintext
src/components/atoms/
├── badge.tsx
├── button.tsx
├── icon.tsx
├── input.tsx
├── skeleton.tsx
└── trend-indicator.tsx
```

---

## 🧬 Molecules (Moléculas)

Las moléculas combinan **dos o más átomos** para crear componentes con funcionalidad específica.

```plaintext
src/components/molecules/
├── card.tsx
├── login-form.tsx
└── product-row.tsx
```

---

## 🧱 Organisms (Organismos)

Los organismos son **secciones completas de la interfaz** que combinan moléculas y átomos para formar bloques funcionales autónomos.

```plaintext
src/components/organisms/
├── category-chart.tsx
├── header.tsx
├── metric-card.tsx
├── product-table.tsx
├── revenue-chart.tsx
├── sidebar.tsx
└── simulator-form.tsx
```

---

## 🔄 Diagrama de dependencias

```plaintext
  Pages (templates)
    │
    ▼
  Organisms ──► Molecules ──► Atoms
    │                │            │
    ▼                ▼            ▼
  Hooks/Actions   Actions     Utils/Types
    │                │
    ▼                ▼
  API Client ◄───────┘
    │
    ▼
  FakeStore API (externa)
```

> Los componentes solo pueden importar elementos de su **mismo nivel o inferior**, nunca de un nivel superior.

---

# 🛠 Stack Tecnológico

| Tecnología | Versión | Propósito |
|------------|----------|------------|
| **Next.js** | 16.1.6 | Framework React con App Router |
| **React** | 19.2.3 | Biblioteca de UI |
| **TypeScript** | 5.x | Tipado estático |
| **Tailwind CSS** | 4.x | Estilos utilitarios con design tokens |
| **Recharts** | 3.7.0 | Gráficos interactivos |
| **SWR** | 2.4.0 | Data fetching con caché |
| **Lucide React** | 0.564.0 | Iconografía |

---

# ⚙ Instalación y desarrollo

```bash
git clone https://github.com/SoyNani/AM-Insight-demo.git
cd AM-Insight-demo
npm install
npm run dev
```

Abrir:

http://localhost:3001

La aplicación redirige automáticamente al dashboard.
