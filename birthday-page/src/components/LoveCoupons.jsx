import { useState, useRef } from 'react'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

const coupons = [
  { id: 1, title: 'Helado de chicle', description: 'Válido por un helado de chicle cuando tú quieras.' },
  { id: 2, title: 'Comida casera', description: 'Válido por una comida cocinada con todo mi amor.' },
  { id: 3, title: 'Tarde de pelis de princesas', description: 'Válido por una tarde completa de películas de princesas.' },
  { id: 4, title: 'Tarde de concentrado', description: 'Válido por una tarde de concentrado solo para nosotros.' },
  { id: 5, title: 'Mochis de oreo', description: 'Válido por 3 mochis de oreo, sin compartir (si tú no quieres).' },
  { id: 6, title: "Hamburguesa Carl's Jr.", description: "Válido por una hamburguesa de Carl's Jr. a tu elección." },
  { id: 7, title: 'Masajes', description: 'Válido por una sesión de masajes relajantes.' },
  { id: 8, title: 'Un día de "sí"', description: 'Válido por todo un día de decirte que sí (con algunas excepciones).' },
  { id: 9, title: '1000 besos', description: 'Válido por mil besos entregados en dosis peligrosamente altas.' },
  { id: 10, title: 'Escapada juntos', description: 'Válido por una escapada a cualquier lado que tú elijas, menos quedarnos en casa.' },
]

function LoveCoupons() {
  const [selectedCoupon, setSelectedCoupon] = useState(null)
  const couponRefs = useRef({})

  const saveCoupon = async (coupon) => {
    const element = couponRefs.current[coupon.id]
    if (!element) return

    try {
      const canvas = await html2canvas(element, {
        backgroundColor: '#FFF3DF',
        scale: 2,
      })
      const link = document.createElement('a')
      link.download = `cupon-tatiana-${coupon.id}.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
    } catch (err) {
      console.error('Error saving coupon:', err)
    }
  }

  const downloadPDF = async () => {
    try {
      const pdf = new jsPDF('portrait', 'mm', 'a4')
      const couponsPerPage = 10
      const cols = 2
      const rows = 5
      const pageWidth = pdf.internal.pageSize.getWidth()
      const pageHeight = pdf.internal.pageSize.getHeight()
      const margin = 10
      const couponWidth = (pageWidth - margin * 3) / cols
      const couponHeight = (pageHeight - margin * 2) / rows

      const tempContainer = document.createElement('div')
      tempContainer.style.position = 'absolute'
      tempContainer.style.left = '-9999px'
      tempContainer.style.width = `${pageWidth}mm`
      tempContainer.style.backgroundColor = '#FFF3DF'
      tempContainer.style.padding = '10px'
      tempContainer.style.display = 'grid'
      tempContainer.style.gridTemplateColumns = 'repeat(2, 1fr)'
      tempContainer.style.gap = '10px'
      document.body.appendChild(tempContainer)

      for (const coupon of coupons) {
        const couponDiv = document.createElement('div')
        couponDiv.style.background = 'linear-gradient(135deg, #FBE1CF 0%, #FFF3DF 100%)'
        couponDiv.style.border = '2px solid #D4A574'
        couponDiv.style.borderRadius = '12px'
        couponDiv.style.padding = '15px'
        couponDiv.style.textAlign = 'center'
        couponDiv.style.height = 'auto'
        couponDiv.innerHTML = `
          <div style="color: #D4A574; font-size: 10px; font-family: serif;">CUPÓN ${String(coupon.id).padStart(2, '0')}</div>
          <div style="color: #2B1B12; font-size: 18px; font-family: serif; font-weight: bold; margin: 10px 0;">${coupon.title}</div>
          <div style="color: #5a4a3a; font-size: 12px;">${coupon.description}</div>
          <div style="color: #D4A574; font-size: 20px; margin-top: 10px;">♥</div>
        `
        tempContainer.appendChild(couponDiv)
      }

      await new Promise(resolve => setTimeout(resolve, 500))

      const canvas = await html2canvas(tempContainer, {
        backgroundColor: '#FFF3DF',
        scale: 2,
      })
      document.body.removeChild(tempContainer)

      const imgData = canvas.toDataURL('image/png')
      pdf.addImage(imgData, 'PNG', 0, 0, pageWidth, pageHeight)
      pdf.save('cupones-amor-tatiana.pdf')
    } catch (err) {
      console.error('Error generating PDF:', err)
    }
  }

  return (
    <div>
      <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap' }}>
        <button
          onClick={downloadPDF}
          style={{
            padding: '12px 24px',
            fontSize: '14px',
            borderRadius: '8px',
            border: '2px solid #D4A574',
            backgroundColor: 'transparent',
            color: '#D4A574',
            cursor: 'pointer',
            fontFamily: 'serif',
            fontWeight: '600',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#D4A574'
            e.currentTarget.style.color = '#050510'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent'
            e.currentTarget.style.color = '#D4A574'
          }}
        >
          📥 Descargar cuponera en PDF
        </button>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
        gap: '16px',
        marginTop: '24px',
      }}>
        {coupons.map((coupon) => (
          <div
            key={coupon.id}
            ref={(el) => (couponRefs.current[coupon.id] = el)}
            onClick={() => setSelectedCoupon(coupon)}
            style={{
              background: 'linear-gradient(135deg, #FBE1CF 0%, #FFF3DF 100%)',
              border: '2px solid #D4A574',
              borderRadius: '12px',
              padding: '20px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              position: 'relative',
              boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)'
              e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.4)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)'
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.3)'
            }}
          >
            <div style={{
              color: '#D4A574',
              fontSize: '12px',
              fontFamily: 'serif',
              marginBottom: '8px',
            }}>
              CUPÓN {String(coupon.id).padStart(2, '0')}
            </div>
            <div style={{
              color: '#2B1B12',
              fontSize: 'clamp(1.1rem, 3vw, 1.4rem)',
              fontFamily: 'serif',
              fontWeight: 'bold',
              marginBottom: '8px',
              lineHeight: 1.3,
            }}>
              {coupon.title}
            </div>
            <div style={{
              color: '#5a4a3a',
              fontSize: 'clamp(0.8rem, 2vw, 0.95rem)',
              lineHeight: 1.5,
            }}>
              {coupon.description}
            </div>
            <div style={{
              color: '#D4A574',
              fontSize: '24px',
              marginTop: '12px',
              textAlign: 'center',
            }}>
              ♥
            </div>
          </div>
        ))}
      </div>

      {selectedCoupon && (
        <div
          onClick={() => setSelectedCoupon(null)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(5, 5, 16, 0.9)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '20px',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            ref={(el) => (couponRefs.current[selectedCoupon.id + '_modal'] = el)}
            style={{
              background: 'linear-gradient(135deg, #FBE1CF 0%, #FFF3DF 100%)',
              border: '3px solid #D4A574',
              borderRadius: '16px',
              padding: '32px',
              maxWidth: '400px',
              width: '100%',
              textAlign: 'center',
              position: 'relative',
            }}
          >
            <button
              onClick={() => setSelectedCoupon(null)}
              style={{
                position: 'absolute',
                top: '12px',
                right: '12px',
                background: 'none',
                border: 'none',
                color: '#5a4a3a',
                fontSize: '24px',
                cursor: 'pointer',
              }}
            >
              ×
            </button>
            <div style={{
              color: '#D4A574',
              fontSize: '14px',
              fontFamily: 'serif',
              marginBottom: '12px',
            }}>
              CUPÓN {String(selectedCoupon.id).padStart(2, '0')}
            </div>
            <div style={{
              color: '#2B1B12',
              fontSize: 'clamp(1.4rem, 4vw, 1.8rem)',
              fontFamily: 'serif',
              fontWeight: 'bold',
              marginBottom: '12px',
            }}>
              {selectedCoupon.title}
            </div>
            <div style={{
              color: '#5a4a3a',
              fontSize: 'clamp(0.9rem, 2vw, 1.1rem)',
              marginBottom: '20px',
              lineHeight: 1.6,
            }}>
              {selectedCoupon.description}
            </div>
            <div style={{
              color: '#D4A574',
              fontSize: '36px',
              marginBottom: '24px',
            }}>
              ♥ ♥ ♥
            </div>
            <button
              onClick={() => saveCoupon(selectedCoupon)}
              style={{
                padding: '12px 24px',
                fontSize: '14px',
                borderRadius: '8px',
                border: '2px solid #D4A574',
                backgroundColor: 'transparent',
                color: '#2B1B12',
                cursor: 'pointer',
                fontFamily: 'serif',
                fontWeight: '600',
              }}
            >
              💾 Guardar este cupón
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default LoveCoupons