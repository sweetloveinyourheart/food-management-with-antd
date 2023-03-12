import { Space } from "antd";
import Search from "antd/es/input/Search";

function SearchForm({ onSearch }) {
    return (
        <Space direction="vertical" style={{ marginBottom: 12 }}>
            <Search placeholder="input search text" onSearch={onSearch} enterButton />
        </Space>
    );
}

export default SearchForm;