export const useWhatsapp = () => {
    const link = (phone, text) => {
        const cleanPhone = phone?.replace(/[^\d]/g, "")
        const message = encodeURIComponent(text)

        return `https://wa.me/${cleanPhone}?text=${message}`
    }

    return { link }
}