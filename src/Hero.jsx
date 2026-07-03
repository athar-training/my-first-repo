import { motion } from 'motion/react'
import { Plus } from 'lucide-react'
import './Hero.css'

const EASE = [0.16, 1, 0.3, 1]
const VIDEO_URL =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260508_215831_c6a8989c-d716-4d8d-8745-e972a2eec711.mp4'

/* Brand logo: two rounded rectangles rotated -35deg */
function LogoMark() {
  return (
    <svg width="26" height="26" viewBox="0 0 26 26" fill="none" aria-hidden="true">
      <g transform="rotate(-35 13 13)">
        <rect x="7" y="2" width="5" height="22" rx="2.5" fill="#000000" />
        <rect x="14" y="2" width="5" height="22" rx="2.5" fill="#000000" />
      </g>
    </svg>
  )
}

/* 4-dot grid icon (inside the right-side black circle) */
function DotGrid() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
      <circle cx="3.5" cy="3.5" r="1.5" fill="#ffffff" />
      <circle cx="8.5" cy="3.5" r="1.5" fill="#ffffff" />
      <circle cx="3.5" cy="8.5" r="1.5" fill="#ffffff" />
      <circle cx="8.5" cy="8.5" r="1.5" fill="#ffffff" />
    </svg>
  )
}

export default function Hero() {
  return (
    <div className="hero">
      {/* Background video */}
      <motion.div
        className="hero__video"
        initial={{ opacity: 0, scale: 1.05 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.8, ease: EASE }}
      >
        <video autoPlay muted loop playsInline>
          <source src={VIDEO_URL} type="video/mp4" />
        </video>
      </motion.div>

      {/* Navbar */}
      <motion.nav
        className="nav"
        initial={{ y: -16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: EASE }}
      >
        <div className="nav__group">
          <div className="brand">
            <LogoMark />
            <span className="brand__text">أثر</span>
          </div>

          <button className="menu-btn">
            <span className="menu-btn__circle">
              <Plus size={12} strokeWidth={3} color="#000" />
            </span>
            <span className="menu-btn__label">القائمة</span>
          </button>

          <div className="tags-pill">
            <span>تصميم احترافي</span>
            <span className="tags-pill__sep" />
            <span>محتوى رقمي</span>
          </div>
        </div>

        <div className="nav__group">
          <div className="systems-pill">
            <button className="systems-pill__circle" aria-label="الأنظمة">
              <DotGrid />
            </button>
            <span className="systems-pill__label">شركاء النجاح</span>
          </div>
        </div>
      </motion.nav>

      {/* Footer content */}
      <motion.div
        className="footer"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.5, ease: EASE }}
      >
        <div className="footer__left">
          <motion.div
            className="subtitle"
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6, ease: EASE }}
          >
            <span className="subtitle__dot" />
            <span>أفضل مركز تدريب إبداعي 2026</span>
          </motion.div>

          <motion.h1
            className="heading"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8, ease: EASE }}
          >
            دورات احترافية،
            <br />
            إبداع بلا حدود.
          </motion.h1>

          <motion.div
            className="actions"
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.0, ease: EASE }}
          >
            <button className="btn btn--solid">استعرض الدورات</button>
            <button className="btn btn--ghost">كيف نبدأ</button>
          </motion.div>
        </div>

        <div className="footer__right">
          <span className="chip">فوتوشوب</span>
          <span className="chip">إليستريتور</span>
          <span className="chip">إنديزاين</span>
        </div>
      </motion.div>
    </div>
  )
}
