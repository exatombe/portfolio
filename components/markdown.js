import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import Link from "next/link";
import { Link as MuiLink, Paper, TableRow, TableHead, TableContainer, TableCell, Table, TableBody} from "@mui/material";
import ReactMarkdown from 'react-markdown';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import { materialDark } from "react-syntax-highlighter/dist/cjs/styles/prism";


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
        table: (props) => (<TableContainer component={Paper}> <Table sx={{ minWidth: 650 }} aria-label="simple table" {...props} /> </TableContainer>),
        thead: TableHead,
        tbody: TableBody,
        tr: TableRow,
        th: TableCell,
        td: TableCell,
        a: (props) => <Link href={props.href} passHref><MuiLink>{props.children}</MuiLink></Link>,        
    }}
  />
  );
}