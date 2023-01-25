# Activity 1

```xml
<list:employeeList xmlns:list="urn:corp:list" xmlns:employee="urn:corp:emp" xmlns:department="urn:corp:dep">
  <list:personList>
    <emp:empID>E0000001</empID>
    <dep:name>Sales</team:name>
    <emp:name>John Smith</emp:name>
  </list:personList>
  <list:personList>
    <emp:empID>E0000002</empID>
    <dep:name>Development</team:name>
    <emp:name>Ichiro Tanaka</emp:name>
  </list:personList>
  <list:personList>
    <emp:empID>E0000003</empID>
    <dep:name>Development</team:name>
    <emp:name>Jiro Suzuki</emp:name>
  </list:personList>
  <list:personList>
    <emp:empID>E0000004</empID>
    <dep:name>Administrative</name>
    <emp:name>Saburo Takahashi</name>
  </list:personList>
</list:employeeList>
```

Resolve naming collision by adding namepsaces

- `employeeList` and `personList` - list schema
- `empId` and second `name` - employee schema
- first `name` - department schema

---

- list schema - urn:corp:list
- employee schema - urn:corp:emp
- department schema - urn:corp:dep

Save file as `module-3/asssignments/activity-1.xml`
