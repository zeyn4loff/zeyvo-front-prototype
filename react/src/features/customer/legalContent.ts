export type LegalTab = "terms" | "privacy";
export const content: Record<LegalTab, { title: string; paragraphs: string[] }> = {
  terms: {
    title: "İstifadəçi şərtləri",
    paragraphs: [
      "Rezervasiyalar bu cihazın brauzerində saxlanılır və xidmət təminatçısına avtomatik göndərilmir. Qəbulu təsdiqləmək üçün məkanla birbaşa əlaqə saxlayın.",
      "Hesab və rezervasiya məlumatları yalnız istifadə etdiyiniz brauzerdə saxlanılır. Brauzer məlumatlarını sildikdə bu məlumatlar da silinə bilər.",
      "Göstərilən qiymətləri və boş vaxtları xidmət təminatçısı ilə dəqiqləşdirin. Bu saytda ödəniş qəbul edilmir.",
    ],
  },
  privacy: {
    title: "Məxfilik",
    paragraphs: [
      "Ad, e-poçt, telefon, şəhər, seçilmişlər və rezervasiya məlumatları istifadə etdiyiniz brauzerdə saxlanılır.",
      "Şifrəniz brauzerdə açıq mətn kimi saxlanılmır; giriş üçün onun duzlanmış heşi saxlanılır. Hesab məlumatları serverə göndərilmir və e-poçt vasitəsilə şifrə bərpası hələ mövcud deyil.",
      "Bu cihazdan istifadə edən digər şəxslər saxlanmış məlumatları görə bilər. Onları silmək üçün brauzerin sayt məlumatlarını təmizləyin.",
    ],
  },
};

