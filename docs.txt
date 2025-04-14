go là "namespace" mà tất cả các kiểu GoJS nằm trong đó. 
Tất cả các mã sử dụng các lớp GoJS như Diagram hoặc Node hoặc Panel hoặc Shape hoặc TextBlock sẽ được thêm tiền tố "go".


Diagrams and Models
Các Node và Link của Diagram là hình ảnh hóa dữ liệu được quản lý bởi Model. 
GoJS có kiến ​​trúc model-view, trong đó Model chứa dữ liệu (mảng đối tượng JavaScript) mô tả các node và link, 
và Diagram hoạt động như các view để hình ảnh hóa dữ liệu này bằng các đối tượng Node và Link thực tế. 
Model, không phải Diagram, là những gì bạn tải lên rồi lưu sau khi chỉnh sửa. 
Bạn thêm bất kỳ thuộc tính nào bạn cần cho ứng dụng của mình vào các đối tượng dữ liệu trong model; 
bạn không thêm thuộc tính vào hoặc sửa đổi nguyên mẫu của các lớp Diagram và GraphObject.



Styling Nodes
Các nút được định kiểu bằng cách tạo các template bao gồm GraphObject và thiết lập các thuộc tính trên các đối tượng đó. 
Để tạo một nút, chúng ta có một số lớp khối xây dựng theo ý mình:

Shape: để hiển thị hình học được xác định trước hoặc tùy chỉnh với màu sắc
Text: để hiển thị văn bản (có khả năng chỉnh sửa) bằng nhiều phông chữ khác nhau
Picture: để hiển thị hình ảnh, bao gồm cả tệp SVG
Panel: các container để chứa một bộ sưu tập các object khác có thể được định vị và định kích thước theo nhiều cách khác nhau tùy theo loại Panel 
(như tables, vertical stacks và vertical stacks)


Tất cả các khối xây dựng này có nguồn gốc từ lớp trừu tượng graphObject, 
vì vậy chúng tôi tình cờ gọi chúng là graphObjects hoặc đối tượng hoặc phần tử. 
Lưu ý rằng graphObject không phải là thành phần HTML DOM, do đó, có nhiều chi phí hơn trong việc tạo hoặc sửa đổi các đối tượng đó. (hiệu suất)

Chúng tôi muốn các thuộc tính dữ liệu mô hình ảnh hưởng đến các Node của chúng tôi và điều này được thực hiện thông qua các ràng buộc dữ liệu. 
Các ràng buộc dữ liệu cho phép chúng tôi thay đổi giao diện và hành vi của GraphObject trong Node bằng cách tự động đặt các thuộc tính trên các 
GraphObject đó thành các giá trị được lấy từ dữ liệu mô hình. Các đối tượng dữ liệu mô hình là các đối tượng JavaScript thuần túy. Bạn có thể chọn 
sử dụng bất kỳ tên thuộc tính nào bạn thích trên dữ liệu nút trong mô hình.

TextBlock, Shape và Picture là các khối xây dựng cơ bản của GoJS. TextBlock không thể chứa hình ảnh; Shape không thể chứa văn bản. 
Nếu bạn muốn node của mình hiển thị một số văn bản, bạn phải sử dụng TextBlock. Nếu bạn muốn vẽ hoặc tô một số hình học, bạn phải sử dụng Shape.

Kinds of Models

Để có được các liên kết vào sơ đồ của chúng ta, Model cơ bản sẽ không cắt nó. 
Chúng ta sẽ phải chọn một trong hai mô hình khác trong GoJS là  GraphLinksModel và TreeModel , cả hai đều hỗ trợ Liên kết. 

Diagram Layouts:

- TreeLayout
