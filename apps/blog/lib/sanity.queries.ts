export const homeQuery = `{
  "siteConfig": *[_type == "siteConfig"][0]{
    heroTitle,
    heroSubtitle,
    heroCtaText,
    hookTitle,
    hookDescription,
    hookQrCode
  },
  "categories": *[_type == "category"] | order(order asc) {
    name,
    skillsList,
    "slug": slug.current,
    order
  },
  "posts": *[_type == "post" && status == "published"] | order(_createdAt desc)[0...3] {
    title,
    "slug": slug.current,
    excerpt,
    coverImage,
    "type": postType
  }
}`;
