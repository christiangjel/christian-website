// 'use client'

// import { useEffect } from 'react'

// export const useScrollUrlSync = () => {
//   useEffect(() => {
//     const sections = document.querySelectorAll('main section')

//     const handleScroll = () => {
//       // const scrollPosition = window.scrollY + window.innerHeight * 0.2

//       // Find the section currently in view
//       const currentSection = Array.from(sections).find((section) => {
//         const rect = section.getBoundingClientRect()
//         return rect.top <= window.innerHeight * 0.2 && rect.bottom >= 0
//       })

//       if (currentSection) {
//         const sectionId = currentSection.id
//         // Update URL without page reload
//         window.history.replaceState(null, '', `#${sectionId}`)
//       }
//     }

//     // Check for initial hash on load
//     const hash = window.location.hash.replace('#', '')
//     if (hash) {
//       const targetSection = document.getElementById(hash)
//       if (targetSection) {
//         targetSection.scrollIntoView({
//           behavior: 'smooth',
//           block: 'start'
//         })
//       }
//     }

//     // Add scroll event listener
//     window.addEventListener('scroll', handleScroll)

//     return () => {
//       window.removeEventListener('scroll', handleScroll)
//     }
//   }, [])
// }
