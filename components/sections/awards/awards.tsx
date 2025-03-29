// 'use client'

// import content from '@/data/content.json'

// export const Awards = () => {
//   return (
//     <section className='py-14'>
//       <h2 className='text-3xl font-bold tracking-tight mb-12'>
//         {content.awards.title}
//       </h2>
//       <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
//         {content.awards.items.map((award, index) => (
//           <a
//             key={index}
//             href={award.link}
//             target='_blank'
//             rel='noopener noreferrer'
//             className='block'
//           >
//             <div className='border border-mint/20 rounded-lg p-6 h-full transition-colors hover:border-mint hover:bg-mint/5 bg-background'>
//               <div className='text-muted-foreground mb-2'>{award.year}</div>
//               <h3 className='font-bold text-xl mb-2'>{award.title}</h3>
//               <p>{award.project}</p>
//             </div>
//           </a>
//         ))}
//       </div>
//     </section>
//   )
// }
