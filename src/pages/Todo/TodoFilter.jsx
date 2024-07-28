import { Form, Input, InputNumber, Slider } from "antd";
import { useState } from "react";
import { searchQueryFormat, todoQueries, useSearchQuery } from "../../utils/useSearchQuery";
import PropTypes from "prop-types";

function TodoFilter({ form, formData, setFormData }) {
  const [searchQuery, setSearchQuery] = useSearchQuery(todoQueries);

  const [time, setTime] = useState();
  const [max] = useState(10000);

  const handleFinish = (values) => {
    const { range, ...rest } = values;
    const amount_$gte = range[0];
    const amount_$lte = range[1];

    const query = { ...rest, amount_$gte, amount_$lte };
    setSearchQuery(searchQueryFormat({ ...searchQuery, ...query, page: 1 }));
  };

  return (
    <div>
      {/* <Button onClick={handleClear} icon={<ReloadOutlined />} danger /> */}

      <Form
        onValuesChange={(_, values) => {
          clearTimeout(time);
          setFormData((prev) => ({ ...prev, ...values }));
          setTime(setTimeout(() => handleFinish(values), 1000));
        }}
        form={form}
        layout="vertical"
        name="todoFilter"
        initialValues={{ range: [0, max] }}
        onFinish={handleFinish}
      >
        <Form.Item name="query" label="Search">
          <Input placeholder="Search" />
        </Form.Item>
        <Form.Item name="range" label="Amount Range">
          <Slider range={true} marks={2} min={0} max={max} placeholder="Input Amount Range" />
        </Form.Item>
        <div className="flex items-baseline">
          <Form.Item name={["range", 0]}>
            <InputNumber className="w-full" controls={false} min={0} max={formData?.range[1] || max} />
          </Form.Item>
          <div className="px-3"> ~ </div>
          <Form.Item name={["range", 1]}>
            <InputNumber className="w-full" controls={false} min={formData?.range[0] || 0} />
          </Form.Item>
        </div>

      </Form>
    </div>
  );
}

export default TodoFilter;

TodoFilter.propTypes = {
  form: PropTypes.object,
  formData: PropTypes.object,
  setFormData: PropTypes.func,
};
