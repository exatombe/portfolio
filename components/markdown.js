import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Link from "@mui/material/Link";
import ReactMarkdown from 'react-markdown';
import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';

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
            {...props}
          />
        ) : (
          <code className={className} {...props}>
            {children}
          </code>
        )
      },
        table: (props) => (<TableContainer> <Table {...props} /> </TableContainer>),
        thead: TableHead,
        tbody: TableBody,
        tr: TableRow,
        th: TableCell,
        td: TableCell,
        a: (props) => <Link {...props} />,        
    }}
  />
  );
}