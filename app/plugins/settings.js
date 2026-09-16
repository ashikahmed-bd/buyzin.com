export default defineNuxtPlugin(() => {
  useState("settings", () => ({
    app: {
      name: "Buyzin",
      url: "https://buyzin.com",
      address: "Tapur Char, Rowmari Sadar,<br>Rowmari, Kurigram 5640, Bangladesh",
      contact: {
        sales_phone: "09649-492233",
        support_phone: "01911-588858",

        sales_email: "sales@buyzin.com",
        support_email: "support@buyzin.com",
      },
    },

    social: {
      facebook: "https://www.facebook.com/BuyzinOfficial",
      instagram: "https://www.instagram.com/BuyzinOfficial",
      threads: "https://www.threads.com/@buyzinofficial",
      youtube: "https://www.youtube.com/@BuyzinOfficial",
      pinterest: "https://www.pinterest.com/BuyzinOfficial",
      linkedin: "https://www.linkedin.com/company/buyzinofficial",
    },

    payments: {
      bkash: true,
      nagad: true,
      rocket: true,
      cod: true,
    },

    company: {
      name: "Buyzin Limited",
      founded: "2025",
    },
  }));
});