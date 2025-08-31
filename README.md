# Spíu Gallery

A fast, secure **tattoo portfolio & booking site** built with **Next.js (App Router) + Tailwind**, deployed on **Vercel**, and powered by a lightweight **AWS contact pipeline** (API Gateway → Lambda → SES) with **S3 backups**. Images are served from **Cloudinary**. v1 ships static-first (ISR) using JSON; v1.1 adds booking & commissions.

---

## Architecture

- **Hosting:** Vercel (Next.js, ISR, static-first)
- **Images:** Cloudinary
- **Contact form:** Next.js `/api/contact` → API Gateway (HTTP) → Lambda → SES
- **Monitoring:** CloudWatch log group + alarm on Lambda errors
- **Backups:** Nightly GitHub Action → S3 (`artworks.json` + optional assets)
- **Analytics:** Plausible

---
