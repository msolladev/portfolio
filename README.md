# Portfolio — Setup & Deploy Guide

Stack: **Next.js 15 · TypeScript · Tailwind v4 · Framer Motion · Docker · Nginx**

---

## Desarrollo local

```bash
cp .env.example .env.local
# edita .env.local con tus valores

npm install
npm run dev
# → http://localhost:3000
```

---

## Estructura del proyecto

```
src/
├── app/
│   ├── layout.tsx          # Root layout + SEO metadata + JSON-LD
│   ├── page.tsx            # Home (Hero + Terminal + Stack)
│   ├── sobre-mi/           # About page
│   ├── blog/
│   │   ├── page.tsx        # Listado de posts
│   │   └── [slug]/page.tsx # Post individual (MDX)
│   ├── contacto/           # Formulario de contacto
│   └── api/contact/        # API route → Resend
├── components/
│   ├── layout/             # Nav, Footer
│   └── sections/           # Hero, Terminal, Stack
├── lib/
│   └── posts.ts            # Utilidades para leer MDX
└── styles/
    └── globals.css         # Design tokens + base styles

content/
└── blog/                   # Posts en MDX
    └── *.mdx

nginx/
└── portfolio.conf          # Config Nginx (reverse proxy + SSL)
```

---

## Añadir un post al blog

Crea `content/blog/mi-post.mdx`:

```mdx
---
title: "Título del post"
description: "Descripción corta para SEO y listado"
date: "2026-02-01"
tags: ["react", "arquitectura"]
readTime: "5 min"
---

Contenido en Markdown...
```

El post aparece automáticamente en `/blog` y genera su propia ruta `/blog/mi-post`.

---

## Deploy en VPS

### 1. Preparar el servidor (una sola vez)

```bash
# En el VPS
apt update && apt install -y docker.io docker-compose-plugin nginx certbot python3-certbot-nginx

# Crear red Docker compartida con Nginx
docker network create web

# Crear directorio de trabajo
mkdir ~/portfolio && cd ~/portfolio
```

### 2. SSL con Certbot

```bash
certbot --nginx -d tunombre.dev -d www.tunombre.dev
```

### 3. Nginx

```bash
cp nginx/portfolio.conf /etc/nginx/sites-available/portfolio
# Edita el archivo: reemplaza tunombre.dev por tu dominio real
ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
nginx -t && systemctl reload nginx
```

### 4. Secrets en GitHub

En **Settings → Secrets and variables → Actions** añade:

| Secret          | Valor                                      |
|-----------------|--------------------------------------------|
| `VPS_HOST`      | IP o dominio de tu VPS                     |
| `VPS_USER`      | Usuario SSH (ej: `ubuntu`, `deploy`)       |
| `VPS_SSH_KEY`   | Clave privada SSH (contenido de `id_ed25519`) |

En **Variables** (no secrets, son públicas en logs):

| Variable               | Valor                        |
|------------------------|------------------------------|
| `NEXT_PUBLIC_SITE_URL` | `https://tunombre.dev`       |

### 5. Primer deploy manual (opcional)

```bash
# En el VPS, dentro de ~/portfolio
cat > .env << 'EOF'
NEXT_PUBLIC_SITE_URL=https://tunombre.dev
RESEND_API_KEY=re_xxxxxxxxxxxx
EOF

docker compose up -d
```

### 6. Deploy automático

A partir de aquí, cada `git push` a `main`:
1. Ejecuta lint + type-check
2. Construye la imagen Docker y la sube a GHCR
3. Se conecta al VPS por SSH y hace pull + recreate del contenedor

---

## Personalización pendiente (TODO)

- [ ] Reemplaza `Tu Nombre` en `layout.tsx` y `Footer.tsx`
- [ ] Actualiza los links de GitHub y LinkedIn
- [ ] Añade tu email real en `api/contact/route.ts`
- [ ] Verifica tu dominio en [Resend](https://resend.com)
- [ ] Genera `public/og-image.png` (1200×630px)
- [ ] Ajusta el color `--accent` en `globals.css`
- [ ] Actualiza los años de experiencia en `Terminal.tsx` y `Stack.tsx`
- [ ] Escribe tu primer post en `content/blog/`

---

## Rendimiento esperado

Con `output: standalone` + Nginx con caché de assets estáticos:

- Lighthouse Performance: **95+**
- LCP: < 1.2s
- CLS: 0
- Tamaño imagen Docker: ~120MB
