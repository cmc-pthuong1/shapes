### Panel
   1. **Định nghĩa Panel**: 
      - Panels là các đối tượng `GraphObject` chứa các đối tượng `GraphObject` khác bên trong. 
      Mỗi panel chịu trách nhiệm về kích thước và vị trí của các phần tử bên trong nó.
      - Mỗi panel thiết lập hệ tọa độ riêng, và các phần tử trong panel được vẽ theo thứ tự, 
      từ đó tạo ra thứ tự Z (z-index) ngầm định (các phần tử chồng lên nhau).

   2. **Các loại Panel**:
      - Mặc dù chỉ có một lớp Panel, nhưng có nhiều loại panel khác nhau, mỗi loại có mục đích riêng trong việc sắp xếp các phần tử. 
      Khi tạo một panel, bạn thường chỉ định `Panel.type` như là tham số khởi tạo. Một số loại panel điển hình bao gồm:
         - **Panel.Position**: Sắp xếp các phần tử theo vị trí đã chỉ định.
         - **Panel.Vertical**: Sắp xếp các phần tử theo chiều dọc.
         - **Panel.Horizontal**: Sắp xếp các phần tử theo chiều ngang.
         - **Panel.Auto**: Sắp xếp phần tử chính xung quanh các phần tử khác, thường dùng để tạo viền.
         - **Panel.Spot**: Sắp xếp các phần tử theo cách căn chỉnh. ( dựa vào thuộc tính alignment của phần tử)
         - **Panel.Table**: Sử dụng cho bảng.
         - **Panel.Viewbox**: Đưa một phần tử vào kích thước của panel.
         - Các loại panel khác như Panel.Link, Panel.Grid, và Panel.Graduated cũng được đề cập.

   3. **Chức năng và cách sử dụng**:
      - Khi làm việc với các panel, người dùng sẽ không tạo các phần tử (node hoặc link) một cách thủ công, mà thường sẽ sử dụng mô hình và ràng buộc dữ liệu.
      - Lưu ý rằng chỉ có thể thêm **Parts** (bao gồm Nodes và Links) vào Diagrams, và một Part không thể là phần tử của một Panel. Tuy nhiên, tất cả Parts đều là Panels vì lớp Part kế thừa từ Panel.

   4. **Kích thước và hiển thị**:
      - Panels không có các yếu tố trực quan riêng, vì vậy kích thước của chúng thường được hiển thị thông qua thuộc tính `GraphObject.background`.
      - Panels cũng có thuộc tính `Panel.padding` và `GraphObject.margin`. Padding sẽ thu nhỏ tổng diện tích để sắp xếp các phần tử khi kích thước panel bị hạn chế, trong khi margin sẽ làm tăng kích thước panel.


### **Các loại Panel cơ bản**

   **Position Panel**
   1. Định nghĩa Position Panel
         - **Position Panel** là loại panel đơn giản nhất. Mỗi phần tử bên trong nó sẽ có kích thước bình thường, dựa trên kích thước tự nhiên của nó hoặc kích thước được chỉ định qua thuộc tính `GraphObject.desiredSize`, `GraphObject.width`, và `GraphObject.height`.

   2. Vị trí của các phần tử
         - Vị trí của mỗi phần tử được xác định bởi thuộc tính `GraphObject.position`. 
         - Nếu không chỉ định vị trí, phần tử sẽ được đặt tại tọa độ (0,0).
         - Tất cả các vị trí đều dựa trên hệ tọa độ riêng của panel, không phải hệ tọa độ toàn cục của diagran. Điều này có nghĩa là bạn có thể sử dụng tọa độ âm.

   3. Kích thước của Panel
         - Kích thước của **Position Panel** sẽ chỉ đủ lớn để chứa tất cả các phần tử bên trong. Nếu bạn muốn panel lớn hơn, bạn có thể sử dụng thuộc tính `Panel.padding` để tạo khoảng cách xung quanh các phần tử.

   4. Bao gồm điểm gốc
         - Một **Position Panel** luôn bao gồm điểm gốc (0,0) trong hệ tọa độ của nó. Nếu các phần tử bên trong không bao gồm điểm gốc, panel sẽ tự động mở rộng để bao gồm điểm này.

   5. Đặc điểm về hình dạng
         - Khi đặt các hình dạng (Shapes) trong Position Panel, độ dày của đường viền (stroke) của chúng sẽ được tính vào kích thước và vị trí.
         - Nếu bạn muốn căn chỉnh nhiều hình dạng mà không bị ảnh hưởng bởi độ dày của đường viền, bạn có thể đặt thuộc tính `Shape.isGeometryPositioned` là true cho từng hình dạng đó.

   **Position Panel**
