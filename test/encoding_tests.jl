@testitem "non-finite numbers (JL-ENC-001, JL-ENC-002)" begin
    using JSON
    t = Tank(NaN)
    @test isnan(t[:value])
    @test traits(t)["value"] == "nan"         # stored in JSON form
    @test Tank(Inf)[:value] == Inf
    @test traits(Tank(-Inf))["value"] == "-inf"
    @test Tank("inf")[:value] == Inf          # the wire form is accepted
    @test_throws ArgumentError Tank(; max=NaN)
    @test_throws ArgumentError Tank(; max="nan")
    @test AnywidgetInstruments.decode_nonfinite("nan") |> isnan
    @test AnywidgetInstruments.encode_nonfinite(-Inf) == "-inf"
    @test AnywidgetInstruments.encode_nonfinite(1.5) == 1.5
end

@testitem "to_json (JL-ENC-003)" begin
    using JSON
    t = Tank(NaN; unit="m", hi=nothing)
    s = to_json(t)
    d = JSON.parse(s)
    @test d["_kind"] == "tank"
    @test d["value"] == "nan"
    @test d["hi"] === nothing
    @test d["unit"] == "m"
    full = JSON.parse(to_json(t; defaults=true))
    @test full["max"] == 100
end

@testitem "buffers (JL-ENC-004)" begin
    b = encode_buffer("<f4", [1.0, 2.5])
    @test b isa Vector{UInt8}
    @test length(b) == 8
    @test reinterpret(Float32, b) == Float32[1.0, 2.5]    # tests run on little-endian hosts
    @test length(encode_buffer("<f8", [1, 2, 3])) == 24
    @test encode_buffer("uint8", [1, 255]) == UInt8[1, 255]
    @test encode_buffer("u1", [7]) == UInt8[7]
    @test reinterpret(Int32, encode_buffer("<i4", [-1, 2])) == Int32[-1, 2]
    @test encode_buffer("<f8", [1.0]) == reinterpret(UInt8, [htol(1.0)])
    @test_throws ArgumentError encode_buffer(">f4", [1.0])
    @test_throws ArgumentError encode_buffer("<c16", [1.0])
end

@testitem "bytes traits as base64 (JL-ENC-005)" begin
    using Base64
    s = SynopticCanvas(; background=UInt8[0x89, 0x50, 0x4e, 0x47])
    @test s[:background] == base64encode(UInt8[0x89, 0x50, 0x4e, 0x47])
    @test SynopticCanvas(; background="iVBORw==")[:background] == "iVBORw=="
end
