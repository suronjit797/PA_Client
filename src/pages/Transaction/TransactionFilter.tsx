import { Form, Input, InputNumber, Select, Slider } from "antd";
import { useState } from "react";
import { searchQueryFormat, transactionQueries, useSearchQuery } from "../../utils/useSearchQuery";
import { transactionsOptions } from "../../utils/SelectOption";
import PropTypes from "prop-types";

function TransactionFilter({ form, formData, setFormData }) {
  const [searchQuery, setSearchQuery] = useSearchQuery(transactionQueries);

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
        name="TransactionFrom"
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
        <Form.Item name="type" label="Type" rules={[{ required: true, message: "Type is required" }]}>
          <Select placeholder="Select Type" options={transactionsOptions} />
        </Form.Item>
        {/* <Form.Item name="isPending" label="Status"> */}
        {/* <Switch /> */}
        {/* <Radio name="isPending" id="isPending" value="true">
            Pending
          </Radio>
          <Radio name="isPending" id="isPending" value="false">
            Done
          </Radio>
          <Radio name="isPending" id="isPending" value="">
            Nothing
          </Radio> */}
        {/* </Form.Item> */}

        {/* <div className="flex gap-5 justify-between items-center">
          <Button type="primary" htmlType="submit">
            Search
          </Button>
          <Button type="primary" onClick={handleClear} danger htmlType="button">
            Clear
          </Button>
        </div> */}
      </Form>
    </div>
  );
}

export default TransactionFilter;

TransactionFilter.propTypes = {
  form: PropTypes.object,
  formData: PropTypes.object,
  setFormData: PropTypes.func,
};
