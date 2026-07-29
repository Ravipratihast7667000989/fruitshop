class InvoiceModel {

  String id;
  String productName;
  String customerName;
  String category;
  String amount;
  String image;
  String pdf;


  InvoiceModel({
    required this.id,
    required this.productName,
    required this.customerName,
    required this.category,
    required this.amount,
    required this.image,
    required this.pdf,
  });


  factory InvoiceModel.fromJson(Map<String,dynamic> json){

    return InvoiceModel(

      id: json["_id"] ?? "",

      productName: json["productName"] ?? "",

      customerName: json["customerName"] ?? "",

      category: json["category"] ?? "",

      amount: json["amount"].toString(),

      image: json["image"] ?? "",

      pdf: json["pdf"] ?? "",

    );
  }
}