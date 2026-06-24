export default function AiTokenLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className='flex flex-col py-8 md:py-12'>
      <div className='mx-auto w-full max-w-2xl text-left'>{children}</div>
    </section>
  )
}
