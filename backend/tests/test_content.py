import pytest
from httpx import AsyncClient
from datetime import datetime, timezone, timedelta
from app.models.entities import News, Event, Partner


@pytest.mark.asyncio
async def test_news_published_filter_and_slug(client: AsyncClient, test_admin_user):
    """Verifica que el listado público de noticias solo devuelva artículos publicados."""
    # Login admin
    login_resp = await client.post(
        "/api/v1/auth/login",
        data={"username": "admin@test.pe", "password": "AdminPass123!"}
    )
    token = login_resp.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    # 1. Crear noticia publicada
    pub_data = {
        "title": "Noticia Pública Ica",
        "slug": "noticia-publica-ica",
        "category": "Evento Académico",
        "summary": "Resumen de la noticia pública",
        "flyer_url": "https://res.cloudinary.com/demo/image/upload/sample.jpg",
        "is_published": True
    }
    resp1 = await client.post("/api/v1/news", json=pub_data, headers=headers)
    assert resp1.status_code == 201

    # 2. Crear borrador (no publicado)
    draft_data = {
        "title": "Borrador Interno",
        "slug": "borrador-interno",
        "category": "Institucional",
        "summary": "Resumen interno borrador",
        "flyer_url": "https://res.cloudinary.com/demo/image/upload/sample.jpg",
        "is_published": False
    }
    resp2 = await client.post("/api/v1/news", json=draft_data, headers=headers)
    assert resp2.status_code == 201

    # 3. Consultar endpoint público GET /api/v1/news
    list_resp = await client.get("/api/v1/news")
    assert list_resp.status_code == 200
    news_items = list_resp.json()
    slugs = [item["slug"] for item in news_items]
    assert "noticia-publica-ica" in slugs
    assert "borrador-interno" not in slugs, "Los borradores no deben aparecer en la web pública"


@pytest.mark.asyncio
async def test_partners_display_order(client: AsyncClient, test_admin_user):
    """Verifica que los aliados se listen respetando el orden display_order."""
    login_resp = await client.post(
        "/api/v1/auth/login",
        data={"username": "admin@test.pe", "password": "AdminPass123!"}
    )
    token = login_resp.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    p1 = {"name": "Aliado Segundo", "logo_url": "https://example.com/logo2.png", "summary": "Desc", "display_order": 2}
    p2 = {"name": "Aliado Primero", "logo_url": "https://example.com/logo1.png", "summary": "Desc", "display_order": 1}

    await client.post("/api/v1/partners", json=p1, headers=headers)
    await client.post("/api/v1/partners", json=p2, headers=headers)

    res = await client.get("/api/v1/partners")
    assert res.status_code == 200
    partners = res.json()
    assert partners[0]["name"] == "Aliado Primero"
    assert partners[1]["name"] == "Aliado Segundo"
