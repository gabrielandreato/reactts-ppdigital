import styles from './Pagination.module.css';


interface Props {
    totalItems: number,
    itemsPerPage: number
    paginate: any

}

export const Pagination = ({totalItems, itemsPerPage, paginate}: Props) => {
    const pageNumbers = [];

    for(let i = 1; i <= Math.ceil(totalItems / itemsPerPage ); i++){
        pageNumbers.push(i);
    }

    return (
        <nav className={styles.NavBar}>
            <ul className={styles.List}>
                {pageNumbers.map(number => (
                    <li className={styles.List} key={number}>
                        <a className={styles.Link} onClick={() => paginate(number)} href='#'>
                            {number}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}