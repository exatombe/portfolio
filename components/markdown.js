import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import Link from "next/link";
import MuiLink from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';
import ReactMarkdown from 'react-markdown';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import { materialDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import Image from 'next/image';

export default function Markdown({md}) {
  return (
    <ReactMarkdown
    children={md}
    remarkPlugins={[remarkGfm]}
    rehypePlugins={[rehypeRaw]}
    components={{
      code({node, inline, className, children, ...props}) {
        const match = /language-(\w+)/.exec(className || '')
        return !inline && match ? (
          <SyntaxHighlighter
            children={String(children).replace(/\n$/, '')}
            language={match[1]}
            PreTag="div"
            style={materialDark}
            {...props}
          />
        ) : (
          <code className={className} {...props}>
            {children}
          </code>
        )
      },
        table: ({ children, ...props}) => (<TableContainer component={Paper} sx={{maxWidth:"max-content"}}> <Table sx={{ minWidth:"400px"}} aria-label="simple table" >{children}</Table></TableContainer>),
        thead: ({ children, ...props}) => (<TableHead >{children}</TableHead>),
        tbody: ({ children, ...props}) => (<TableBody >{children}</TableBody>),
        tr: ({children, ...props}) => (<TableRow >{children}</TableRow>),
        th: ({children, ...props}) => (<TableCell sx={{fontWeight: "bold"}}> {children} </TableCell>),
        td: ({ children, ...props}) => (<TableCell >{children}</TableCell>),
        a: ({ children, ...props}) => <Link href={props.href} passHref><MuiLink>{children}</MuiLink></Link>, 
        image: ({ children, ...props}) => (<Image src={props.src} width={props.width} height={props.height} alt={props.alt} />),
        img: ({ children, ...props}) => (<Image src={props.src} width={props.width} height={props.height} alt={props.alt} />),
    }}
  />
  );
}