import { Button, Form, Input, InputNumber, Select, Slider, Switch } from "antd";
import { useState } from "react";
import { searchQueryFormat, transactionQueries, useSearchQuery } from "../../utils/useSearchQuery";
import { transactionsOptions } from "../../utils/SelectOption";
import { ReloadOutlined } from "@ant-design/icons";

const initData = { range: [] };

function TransactionSideBar() {
  const [form] = Form.useForm();
  const [searchQuery, setSearchQuery] = useSearchQuery(transactionQueries);

  const [formData, setFormData] = useState(initData);
  const [time, setTime] = useState(initData);
  const [max] = useState(10000);

  const handleFinish = (values) => {
    const { range, ...rest } = values;
    const amount_$gte = range[0];
    const amount_$lte = range[1];

    const query = { ...rest, amount_$gte, amount_$lte };
    setSearchQuery(searchQueryFormat({ ...searchQuery, ...query, page: 1 }));
  };
  const handleClear = () => {
    form.resetFields();
    setFormData(initData);
    setSearchQuery({});
  };
  return (
    <div>
      <h4 className="mb-12 flex items-center justify-between">
        <span className="text-xl font-bold ">Filter</span>
        <Button onClick={handleClear} icon={<ReloadOutlined />} danger />
      </h4>

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
        <Form.Item name="isPending" label="Is Pending?">
          <Switch />
        </Form.Item>

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

export default TransactionSideBar;
