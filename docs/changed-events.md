
#### ChangedEvents
    *** Các loại sự kiện trong GoJS
            1. DiagramEvents: Sự kiện liên quan đến các thay đổi trong diagram tổng thể.
            2. InputEvents: Sự kiện liên quan đến tương tác của người dùng, như nhấp chuột hoặc kéo thả.
            3. ChangedEvents: Sự kiện thông báo về các thay đổi trong trạng thái của các đối tượng, chủ yếu là thay đổi thuộc tính của đối tượng.

    *** Đặc điểm của ChangedEvents
            - Thông báo thay đổi: ChangedEvents được tạo ra khi các đối tượng như Diagrams, GraphObjects, Models, hoặc các đối tượng dữ liệu trong Model bị thay đổi.
            - Thông tin chi tiết: Mỗi ChangedEvent ghi nhận loại thay đổi và thông tin cần thiết để có thể thực hiện thao tác hoàn tác (undo) hoặc làm lại (redo).

    *** Đăng ký lắng nghe sự kiện   
            - Có thể thêm listener cho ChangedEvents thông qua các phương thức như Model.addChangedListener và Diagram.addChangedListener.
            - Cũng có thể sử dụng Diagram.addModelChangedListener để nhận các sự kiện thay đổi cụ thể từ Model.

            - Một Diagram luôn tự động đăng ký làm listener cho Model của nó, vì vậy nó có thể nhận biết và cập nhật các phần tử (Parts) khi có thay đổi.
            - UndoManager: Nếu được kích hoạt, UndoManager sẽ tự động lắng nghe cả Model và Diagram để ghi lại lịch sử thay đổi, hỗ trợ chức năng hoàn tác và làm lại.
        
    

### Các thay đổi liên quan đến Model và Data

    *** Thay đổi thuộc tính Model

            1. ChangedEvents cho Model:
                - Các sự kiện này được tạo ra khi có thay đổi về dữ liệu trong model hoặc chính bản thân Model.
                - Các sự kiện này được phát sinh từ các lệnh gọi đến Model.setDataProperty và các trình thiết lập thuộc tính của Model.
            
            2.Thông tin trong ChangedEvent:
                - ChangedEvent.change: Được xác định bởi giá trị ChangeType.Property, cho biết đây là thay đổi thuộc tính.
                - ChangedEvent.object: Đối tượng đã được thay đổi.
                - ChangedEvent.propertyName: Tên thuộc tính đã được thay đổi.
                - ChangedEvent.oldValue và ChangedEvent.newValue: Giá trị trước và sau khi thay đổi.

    *** Thay đổi cấu trúc của Model

                - Một số thay đổi không chỉ đơn thuần là thay đổi dữ liệu mà còn liên quan đến cấu trúc của model, chẳng hạn như thêm, 
                sửa đổi hoặc xóa các mối quan hệ.
                - ChangedEvent.modelChange: Nếu có thay đổi cấu trúc, thuộc tính này sẽ là một chuỗi non-null mô tả loại thay đổi.

    *** Các loại thay đổi cấu trúc cụ thể:

                "nodeDataArray": Khi mảng nodeDataArray được thay thế.
                "nodeCategory": khi gọi Model.setCategoryForNodeData
                "nodeGroupKey": khi gọi GraphLinksModel.setGroupKeyForNodeData
                "linkDataArray": Khi mảng nodeDataArray được thay thế.
                "linkFromKey": khi gọi GraphLinksModel.setFromKeyForLinkData
                "linkToKey": khi gọi GraphLinksModel.setToKeyForLinkData
                "linkFromPortId": khi gọi GraphLinksModel.setFromPortIdForLinkData
                "linkToPortId": khi gọi GraphLinksModel.setToPortIdForLinkData
                "linkLabelKeys": khi gọi GraphLinksModel.setLabelKeysForLinkData
                "linkCategory": khi gọi GraphLinksModel.setCategoryForLinkData
                "nodeParentKey": khi gọi TreeModel.setParentKeyForNodeData
                "parentLinkCategory": khi gọi TreeModel.setParentLinkCategoryForNodeData


    *** Thay đổi thuộc tính tùy chỉnh
                - Bất kỳ thuộc tính nào cũng có thể được thay đổi trên các đối tượng dữ liệu node hoặc link bằng cách gọi Model.setDataProperty.
                - Những thay đổi này được coi là thay đổi thuộc tính thông thường, do đó ChangedEvent.modelChange sẽ là chuỗi rỗng.

    *** Thay đổi tạm thời
                - Một số thay đổi có thể xảy ra tạm thời, ví dụ như trong các tình huống khi sử dụng các đối tượng tạm thời trong một Tool.
                - Nếu bạn không muốn xử lý các sự kiện này, bạn có thể bỏ qua chúng nếu Model.skipsUndoManager hoặc Diagram.skipsUndoManager là true.

    *** Thay đổi thuộc tính của Model
                - Có các thay đổi thuộc tính trên chính Model, được liệt kê trong tài liệu của Model, GraphLinksModel, và TreeModel.
                - Những trường hợp này cũng được coi là thay đổi thuộc tính thông thường, vì vậy ChangedEvent.modelChange sẽ là chuỗi rỗng, 
                và cả ChangedEvent.model và ChangedEvent.object sẽ là Model chính nó.


