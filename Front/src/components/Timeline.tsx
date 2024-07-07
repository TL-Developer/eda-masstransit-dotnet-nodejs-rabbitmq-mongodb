const Timeline = ({ children }: {children: React.ReactNode}) => (
  <ol className="relative border-s border-gray-200 dark:border-gray-700">    
    {children}
  </ol>
);

Timeline.Item = ({
  date = null,
  title,
  description,
  ok,
}: {
  date?: string | null; 
  title: string;
  description: string;
  ok: boolean;
}) => (
  <li className="ms-4">
    <div
      className={`
        absolute w-5 h-5 ${ok ? 'bg-green-700' : 'bg-gray-700'} rounded-full mt-3 -start-3 border border-white  
      `}
    />
    <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
      {date ? (
        Intl.DateTimeFormat('pt-BR', {dateStyle: 'medium', timeStyle: 'medium'}).format(new Date(date)).toUpperCase()
      ) : (
        'AGUARDE'
      )
      }
    </time>
    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{title}</h3>
    <p className="text-base font-normal text-gray-500 dark:text-gray-400">{description}</p>
  </li>
);

export default Timeline;